const userModel = require("../models/Authmodels.js");
const emailValidator = require("email-validator");

const signup = async (req, res, next) => {
  const { name, email, password, cpassword } = req.body;
  console.log(name, email, password, cpassword);

  if (!name || !email || !password || !cpassword) {
    return res.status(400).json({
      sucess: false,
      message: `every field is required`,
    });
  }
  const validemail = emailValidator.validate(email);
  if (!validemail) {
    return res.status(400).json({
      sucess: false,
      message: `please enter valid email id `,
    });
  }
  if (password != cpassword) {
    return res.status(400).json({
      sucess: false,
      message: `entered password is not same as above`,
    });
  }

  try {
    const userInfo = userModel(req.body);
    const result = await userInfo.save();
    return res.status(200).json({
      sucess: true,
      data: result,
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        sucess: false,
        message: `Account already exist`,
      });
    }
    return res.status(400).json({
      sucess: false,
      message: e.message,
    });
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      sucess: false,
      message: `Account already exist`,
    });
  }

  const user = userModel.findOne({ email }).select(+password);

  if (!user || user.password === password) {
  }
  return res.status(400).json({
    sucess: false,
    message: `Invalid credential`,
  });
};

module.exports = { signup };
