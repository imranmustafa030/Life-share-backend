const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Post = new mongoose.Schema({
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

  Status: {
    type: String,
  },
  Request: {
    type: String,
  },
  Bloodtype: {
    type: String,
  },
  Date: {
    type: String,
  },
  Description: {
    type: String,
  },
  hospital: {
    type: String,
  },

  long: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  Qunatity: {
    type: String,
  },
  Urgent: {
    type: Boolean,
  },
  SurgeryType: {
    type: String,
  },
  Specific: {
    type: String,
  },
  accepted: {
    type: Boolean,
  },
  acceptedby: [Object],
});

module.exports = mongoose.model("Posts", Post);
