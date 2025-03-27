const jwtConfig = require("./jwtConfig");

const cookieConfig = {
  httpOnly: true,
  maxAge: jwtConfig.refresh.expiresIn,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  path: "/",
};

module.exports = cookieConfig;
