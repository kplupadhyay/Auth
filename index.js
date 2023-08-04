require("dotenv").config();
const PORT = 7900;
const app = require("./app");

app.listen(PORT, () => {
  console.log("connected to the server");
});
