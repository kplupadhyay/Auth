const signup = (req, res, next) => {
  const { name, email, password, cpassword } = req.body;

  console.log(name, email, password, cpassword);
  return res.status(200).json({
    sucess: true,
    data: {},
  });
};

module.exports = { signup };
