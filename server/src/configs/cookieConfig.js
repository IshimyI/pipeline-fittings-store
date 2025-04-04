const jwtConfig = require("./jwtConfig");
require("dotenv").config();

// Configure cross-site cookie settings for deployment platforms
// These settings ensure compatibility across modern browsers including Chrome, Firefox, and Safari
// httpOnly is enabled for security to prevent XSS attacks
// Secure and SameSite settings are configured for cross-origin cookie handling
// Partitioned cookies support Safari's Intelligent Tracking Prevention (ITP)
const cookieConfig = {
  httpOnly: true, // Always enabled for security
  maxAge: parseInt(process.env.COOKIE_MAX_AGE) || jwtConfig.refresh.expiresIn,
  sameSite: process.env.COOKIE_SAME_SITE || "none",
  secure: true, // Always enabled for cross-origin cookies
  path: "/",
  domain: ".vercel.app",
  partitioned: true, // Support for Safari's partitioned cookies
};

module.exports = cookieConfig;
