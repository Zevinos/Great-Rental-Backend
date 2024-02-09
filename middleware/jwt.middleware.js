const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

async function isAuthenticated(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(400).json({ message: "No authorization found" });
    }

    const token = authorizationHeader.replace("Bearer", "");

    const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ["HS256"],
    });

    const user = await User.findById(payload._id);
    if (!user) {
      return res.status(401).json({ message: "Denied!" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = isAuthenticated;
