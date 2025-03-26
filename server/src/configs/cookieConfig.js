const jwtConfig = require("./jwtConfig");

const cookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: jwtConfig.refresh.expiresIn,
  domain: "pipeline-fittings-store-client.vercel.app",
};

module.exports = cookieConfig;
