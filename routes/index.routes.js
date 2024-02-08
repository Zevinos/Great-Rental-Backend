const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);
router.use("/place", require("./place.routes"));
router.use("/favorite", require("./favorite.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
