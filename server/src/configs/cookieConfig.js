require("dotenv").config();
const jwtConfig = require("./jwtConfig");

const cookieConfig = {
  httpOnly: true,
  maxAge: jwtConfig.refresh.expiresIn,
  sameSite: "Lax",
  path: "/",
};

module.exports = cookieConfig;
