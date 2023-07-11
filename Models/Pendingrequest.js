const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Pendingrequests = new mongoose.Schema({
  id: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  pictrue: {
    type: String,
  },
  bloodgroup: {
    type: String,
  },
  Status: {
    type: String,
  },
  Report: {
    type: String,
  },
});

module.exports = mongoose.model("Pendingrequests", Pendingrequests);
