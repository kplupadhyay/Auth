const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, `name is required`],
      minlength: [6, `minimum length should be of  character`],
      maxlength: [50, `name should not me morte than 60 charcater`],
      trim: true,
    },
    email: {
      type: String,
      require: [true, `email is mandatory`],
      unique: [true, ` already registered`],
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    cpassword: {
      type: String,
      select: false,
    },
    forgotPassToken: {
      type: String,
    },
    forgotPassExpiryDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
