const jwt = require("jsonwebtoken");

require("dotenv").config();
function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log("invalid refresh token");
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true, path: "/" }).sendStatus(401);
  }
}

module.exports = verifyRefreshToken;
