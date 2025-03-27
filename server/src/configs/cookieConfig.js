const jwtConfig = require("./jwtConfig");

const cookieConfig = {
  httpOnly: true,
  maxAge: jwtConfig.refresh.expiresIn,
  secure: true,
  sameSite: "None",
  path: "/",
};

module.exports = cookieConfig;
