const express = require("express");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const generateTokens = require("../utils/generateTokens");
const cookieConfig = require("../configs/cookieConfig");

const tokensRouter = express.Router();

tokensRouter.get("/refresh", verifyRefreshToken, async (req, res) => {
  try {
    const { accessToken, refreshToken } = generateTokens({
      user: res.locals.user,
    });

    // Обновляем токены и отправляем ответ клиенту
    res
      .cookie("refreshToken", refreshToken, cookieConfig)
      .json({ accessToken, user: res.locals.user });
  } catch (error) {
    console.error("Token refresh error:", error.message);
    res.clearCookie("refreshToken", cookieConfig).status(401).json({
      error: "Authentication failed",
      message: "Failed to refresh token. Please login again.",
    });
  }
});

module.exports = tokensRouter;
