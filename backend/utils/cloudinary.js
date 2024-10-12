const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv').config({path: "backend/config/config.env"});

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
};

module.exports = cloudinaryConfig;