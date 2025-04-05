require("dotenv").config();
const jwtConfig = require("./jwtConfig");

const cookieConfig = {
  httpOnly: true,
  maxAge: jwtConfig.refresh.expiresIn,
  sameSite: "None",
  secure: true,
  path: "/",
};

module.exports = cookieConfig;
