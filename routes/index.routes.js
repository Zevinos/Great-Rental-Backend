const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));
router.use("/places", require("./place.routes"));
router.use("/favorite", require("./favorite.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
