const jwtConfig = require("./jwtConfig");

const cookieConfig = {
  httpOnly: true,
  maxAge: jwtConfig.refresh.expiresIn,
  secure: true,
  sameSite: "None",
  path: "/",
  domain: process.env.NODE_ENV === "production" ? ".vercel.app" : undefined,
};

module.exports = cookieConfig;
