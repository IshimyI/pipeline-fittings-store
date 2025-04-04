const express = require("express");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const generateTokens = require("../utils/generateTokens");
const cookieConfig = require("../configs/cookieConfig");

const tokensRouter = express.Router();

tokensRouter.get("/refresh", verifyRefreshToken, async (req, res) => {
  try {
    if (typeof res.locals.user.isAdmin !== 'boolean') {
      throw new Error('Invalid or missing isAdmin flag in user data');    
    }
    const { accessToken, refreshToken } = generateTokens({
      user: { ...res.locals.user, isAdmin: res.locals.user.isAdmin },
    });

    try {
      // Set the refresh token cookie with proper options
      res
        .cookie("refreshToken", refreshToken, cookieConfig)
        .json({ 
          accessToken, 
          user: { ...res.locals.user, isAdmin: res.locals.user.isAdmin },
          cookieStatus: 'success' 
        });
      
      console.log('Token refresh successful, new refresh token cookie set:', {
        email: res.locals.user.email,
        isAdmin: res.locals.user.isAdmin,
        cookieSettings: {
          sameSite: cookieConfig.sameSite,
          secure: cookieConfig.secure,
          domain: cookieConfig.domain || 'undefined',
          path: cookieConfig.path
        }
      });
    } catch (cookieError) {
      console.error("Cookie setting error:", cookieError.message, cookieError.stack);
      
      // If setting cookie fails, still return the access token
      res.json({ 
        accessToken, 
        user: { ...res.locals.user, isAdmin: res.locals.user.isAdmin },
        cookieStatus: 'error',
        cookieError: cookieError.message
      });
    }
  } catch (error) {
    console.error("Token refresh error:", error.message, error.stack);
    try {
      // Clear the refresh token cookie with proper options
      res.clearCookie("refreshToken", cookieConfig).status(401).json({
        error: "Authentication failed",
        message: "Failed to refresh token. Please login again.",
      });
    } catch (clearCookieError) {
      console.error("Clear cookie error:", clearCookieError.message, clearCookieError.stack);
      res.status(401).json({
        error: "Authentication failed",
        message: "Failed to refresh token. Please login again.",
        cookieError: "Failed to clear refresh token cookie"
      });
    }
  }
});

module.exports = tokensRouter;