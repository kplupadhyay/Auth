// const express = require("express");

// const app = express();
// const Authrouter = require("./router/Authroutes.js");
// // const dbconnection = require("./config/dbconnect.js");
// const dbconnect = require("./config/dbconnect.js");
// dbconnect();
// app.use(express.json());

// app.use("/api/use", Authrouter);

// app.use("/", (req, res) => {
//   res.send("hello");
// });

// module.exports = app;

const express = require("express");
const app = express();

const Authrouter = require("./router/Authroutes.js");
const dbconnect = require("./config/dbconnect.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// connect to db
dbconnect();

app.use(express.json()); // Built-in middleware
app.use(cookieParser()); // Third-party middleware

app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true })); //Third-party middleware

// Auth router
app.use("/api/auth", AuthRouter);

app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTauth server ;)" });
});

module.exports = app;
