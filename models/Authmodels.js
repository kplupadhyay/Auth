// const mongoose = require("mongoose");

// const { Schema } = mongoose;
// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       require: [true, `name is required`],
//       minlength: [6, `minimum length should be of  character`],
//       maxlength: [50, `name should not me morte than 60 charcater`],
//       trim: true,
//     },
//     email: {
//       type: String,
//       require: [true, `email is mandatory`],
//       unique: [true, ` already registered`],
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       select: false,
//     },
//     cpassword: {
//       type: String,
//       select: false,
//     },
//     forgotPassToken: {
//       type: String,
//     },
//     forgotPassExpiryDate: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const userModel = mongoose.model("User", userSchema);
// module.exports = userModel;

const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "user name is Required"],
      minLength: [5, "Name must be at least 5 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      unique: true,
      lowercase: true,
      unique: [true, "already registered"],
    },
    password: {
      type: String,
      select: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods = {
  jwtToken() {
    return JWT.sign(
      { id: this._id, email: this.email },
      process.env.SECRET,
      { expiresIn: "24h" } // 24 hours
    );
  },

  getForgotPasswordToken() {
    const forgotToken = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");

    this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000; // 20min

    return forgotToken;
  },
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
