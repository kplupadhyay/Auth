const express = require("express");

const Authrouter = express.Router();

const { signup } = require("../controllers/Authcontrollers.js");

Authrouter.post("/signup", signup);

module.exports = Authrouter;
