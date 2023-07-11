const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const RecentDonations = new mongoose.Schema({
  Donnor: [Object],
  Reciever: [Object],
});
module.exports = mongoose.model("RecentDonations", RecentDonations);
