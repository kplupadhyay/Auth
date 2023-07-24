const express = require("express");

const Authrouter = express.Router();

const { signup } = require("../controllers/Authcontrollers.js");

Authrouter.post("/signup", signup);
Authrouter.post("/signin", signin);

module.exports = Authrouter;
