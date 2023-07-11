const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registermodule = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  pictrue: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  bloodgroup: {
    type: String,
  },
  lifesaved: {
    type: Number,
  },
  Rank: {
    type: Number,
  },
  long: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  Status: {
    type: String,
  },
  lastbleed: {
    type: String,
  },
  token: {
    type: String,
  },
});
registermodule.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  }
});
registermodule.methods.camparePassword = async function (password) {
  if (!password) throw new Error("Error");
  try {
    const result = bcrypt.compare(password, this.password);
    return result;
  } catch (e) {
    console.log(e.message);
  }
};
module.exports = mongoose.model("Registeredstudents", registermodule);
