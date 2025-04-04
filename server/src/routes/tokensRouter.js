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

    // Create a copy of cookieConfig without the domain property if it's a single dot
    const cookieOptions = { ...cookieConfig };
    if (cookieOptions.domain === '.') {
      delete cookieOptions.domain;
    }

    try {
      res
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({ accessToken, user: { ...res.locals.user, isAdmin: res.locals.user.isAdmin } });
      
      console.log('Token refresh successful, new refresh token cookie set:', {
        email: res.locals.user.email,
        isAdmin: res.locals.user.isAdmin,
        cookieSettings: {
          sameSite: cookieOptions.sameSite,
          secure: cookieOptions.secure,
          domain: cookieOptions.domain || 'undefined'
        }
      });
    } catch (cookieError) {
      console.error("Cookie setting error:", cookieError.message);
      // If setting cookie fails, still return the access token
      res.json({ 
        accessToken, 
        user: { ...res.locals.user, isAdmin: res.locals.user.isAdmin },
        cookieError: "Failed to set refresh token cookie"
      });
    }
  } catch (error) {
    console.error("Token refresh error:", error.message);
    try {
      // Create a copy of cookieConfig without the domain property if it's a single dot
      const cookieOptions = { ...cookieConfig };
      if (cookieOptions.domain === '.') {
        delete cookieOptions.domain;
      }
      
      res.clearCookie("refreshToken", cookieOptions).status(401).json({
        error: "Authentication failed",
        message: "Failed to refresh token. Please login again.",
      });
    } catch (clearCookieError) {
      console.error("Clear cookie error:", clearCookieError.message);
      res.status(401).json({
        error: "Authentication failed",
        message: "Failed to refresh token. Please login again.",
        cookieError: "Failed to clear refresh token cookie"
      });
    }
  }
});

module.exports = tokensRouter;