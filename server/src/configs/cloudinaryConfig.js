const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const watermarkConfig = {
  opacity: process.env.CLOUDINARY_WATERMARK_OPACITY,
  size: process.env.CLOUDINARY_WATERMARK_SIZE,
};

// Configure Cloudinary with credentials and settings
// cloud_name: Your cloudinary cloud name from the dashboard
// api_key: Your cloudinary API key for authentication
// api_secret: Your cloudinary API secret for authentication
// secure: Use HTTPS for all cloudinary operations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const createWatermarkOptions = ({
  opacity = watermarkConfig.opacity,
  size = watermarkConfig.size,
} = {}) => {
  return {
    overlay: process.env.CLOUDINARY_WATERMARK_ID,
    opacity,
    width: size,
    flags: "relative",
    gravity: "center",
  };
};

module.exports = { cloudinary, watermarkConfig, createWatermarkOptions };
