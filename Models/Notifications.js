const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Notifications = new mongoose.Schema({
  Notification: [Object],
});
module.exports = mongoose.model("Notification", Notifications);
