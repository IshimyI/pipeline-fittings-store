const jwtConfig = require("./jwtConfig");
require("dotenv").config();

// Configure cross-site cookie settings for deployment platforms
const cookieConfig = {
  httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
  maxAge: parseInt(process.env.COOKIE_MAX_AGE) || jwtConfig.refresh.expiresIn,
  sameSite: process.env.COOKIE_SAME_SITE || "none",
  secure: process.env.COOKIE_SECURE === "true",
  path: "/",
  domain: process.env.DOMAIN || ".onrender.com",
};

module.exports = cookieConfig;
