const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database

router.post("/signup", async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);
    console.log(req.files);
    // return res.send("ok")
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please input all the required fields." });
    }

    const userAlreadyExist = await User.findOne({ email: email });

    // Use regex to validate the email and password format

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    if (userAlreadyExist) {
      return res.status(400).json({ message: "This email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    console.log(createdUser);

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please input all the required fields." });
    }
    const existingUser = await User.findOne({ email }).select(
      "password username email"
    );
    console.log(existingUser);

    if (!existingUser) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const matchingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!matchingPassword) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign(
      { _id: existingUser._id },
      process.env.TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "7d",
      }
    );

    res.json({ authToken: token });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.user);
});

module.exports = router;
