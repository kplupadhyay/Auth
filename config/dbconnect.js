const mongoose = require("mongoose");

const MONGODB_URL = Process.env.MONGODB_URL;

const dbconnection = () => {
  mongoose
    .connect(MONGODB_URL)
    .then((conn) => console.log("connected to ddatabase"))
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = dbconnection;
