const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.Cloudy_Name,
  api_key: process.env.Cloudy_API_KEY,
  api_secret: process.env.Cloudy_API_SECRET,
});

module.exports = cloudinary;
