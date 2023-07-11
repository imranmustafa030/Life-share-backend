const express = require("express");
const mongoose = require("mongoose");
const routesurl = require("./routes/routes");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
// const port = process.env.Port||3000;#
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const users = require("./Models/Registermodel");

app.use(cors());
app.use("/", routesurl);
app.get("/", function (req, res) {
  res.send("Hello World");
});

dotenv.config();
mongoose
  .connect(process.env.Mongo_Uri)
  .then(() => {
    console.log("Conected");
    app.listen(process.env.PORT || 4000, () =>
      console.log("SERVER IS RUNNING")
    );
  })
  .catch((err) => {
    console.log("error", err);
  });
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
// const test = async (email, password) => {
//   const user = await users.findOne({ email: email });
//   const result = await user.camparePassword(password);
//   console.log(result);
// };
// test("nad.s.com", "112233");
