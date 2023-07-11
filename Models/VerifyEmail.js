const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const VerifiedEmail = new mongoose.Schema({
  email: {
    type: String,
  },
  UniqueString: {
    type: String,
  },
});

module.exports = mongoose.model("VerifiedEmail", VerifiedEmail);
