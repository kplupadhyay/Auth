const express = require("express");

const app = express();
const Authrouter = require("./router/Authroutes.js");
const dbconnection = require("./config/dbconnect.js");
dbconnection();
app.use(express.json());

app.use("/api/use", Authrouter);

app.use("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
