const jwtConfig = require("./jwtConfig");

const cookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  domain: ".vercel.app",
  path: "/",
  maxAge: jwtConfig.refresh.expiresIn,
};

module.exports = cookieConfig;
