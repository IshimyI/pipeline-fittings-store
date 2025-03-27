const jwtConfig = require("./jwtConfig");

const cookieConfig = {
  httpOnly: true,
  maxAge: jwtConfig.refresh.expiresIn,
  sameSite: "none",
  secure: true,
  path: "/",
};

module.exports = cookieConfig;
