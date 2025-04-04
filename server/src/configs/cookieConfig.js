require("dotenv").config();
const jwtConfig = require("./jwtConfig");

const cookieConfig = {
  httpOnly: true,
  maxAge: jwtConfig.refresh.expiresIn,
  sameSite: process.env.COOKIE_SAME_SITE || "none",
  secure: process.env.NODE_ENV === "production",
  path: process.env.COOKIE_PATH || "/",
  domain: process.env.DOMAIN || "localhost",
};

module.exports = cookieConfig;
