const express = require("express");
const { User, Inventory, User_selected_items } = require("../../db/models");
const bcrypt = require("bcrypt");
const cookieConfig = require("../configs/cookieConfig");
const jwt = require("jsonwebtoken");
const generateTokens = require("../utils/generateTokens");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        password: hashpass,
      },
    });

    if (!created) return res.sendStatus(402);

    const user = newUser.get();
    delete user.password;

    const { accessToken, refreshToken } = generateTokens({ user });

    // Use cookieConfig directly without overriding settings
    res
      .cookie("refreshToken", refreshToken, cookieConfig)
      .json({ accessToken, user: { ...user, isAdmin: user.isAdmin } });

    console.log("Signup successful, refresh token cookie set:", {
      email: user.email,
      cookieSettings: {
        sameSite: cookieConfig.sameSite,
        secure: cookieConfig.secure,
        domain: cookieConfig.domain,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to signup" });
  }
});

authRouter.post("/login", async (req, res) => {
  console.log(`Login attempt for email: ${req.body.email}`);
  const startTime = Date.now();
  console.log('Token generation will include isAdmin flag');
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  const existingRefreshToken = req.cookies.refreshToken;
  if (existingRefreshToken) {
    try {
      const decoded = jwt.verify(
        existingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (decoded.user.email === email) {
        return res.sendStatus(409); // Already logged in with same account
      }
      res.clearCookie("refreshToken", cookieConfig); // Clear token if different account
    } catch (err) {
      res.clearCookie("refreshToken", cookieConfig); // Clear invalid token
    }
  }
  if (!email || !password) {
    console.error("Login attempt failed: Missing credentials");
    return res.sendStatus(400);
  }
  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser) {
    console.error(`Login attempt failed: User not found for email ${email}`);
    return res.sendStatus(400);
  }

  const isValid = await bcrypt.compare(password, foundUser.password);
  if (!isValid) {
    console.error(`Login attempt failed: Invalid password for user ${email}`);
    return res.sendStatus(400);
  }

  const user = foundUser.get();
  delete user.password;
  user.isAdmin = foundUser.isAdmin || false;
  const { accessToken, refreshToken } = generateTokens({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
  });

  // Use cookieConfig directly without overriding settings
  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieConfig)
    .json({ accessToken, user });

  console.log("Login successful, refresh token cookie set:", {
    email: user.email,
    isAdmin: user.isAdmin,
    cookieSettings: {
      sameSite: cookieConfig.sameSite,
      secure: cookieConfig.secure,
      domain: cookieConfig.domain,
    },
  });
});

authRouter.post("/logout", async (req, res) => {
  try {
    // Use cookieConfig directly without overriding settings
    res.clearCookie("refreshToken", cookieConfig).sendStatus(200);

    console.log("Logout successful, refresh token cookie cleared");
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Failed to logout" });
  }
});

module.exports = authRouter;
