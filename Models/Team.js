const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Teammodule = new mongoose.Schema({
  logo: {
    type: String,
  },
  title: {
    type: String,
  },
  Volunteer: {
    type: Number,
  },
  city: {
    type: String,
  },
  Date: {
    type: Number,
  },

  Members: [Object],
});
module.exports = mongoose.model("Teams", Teammodule);
