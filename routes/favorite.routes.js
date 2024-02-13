const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Favorite = require("../models/Favorite.model");
const { isValidObjectId } = require("mongoose");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allFavoritesOfUser = await Favorite.find({
      user: req.user._id,
    }).populate("place");

    res.json(allFavoritesOfUser);
  } catch (error) {
    next(error);
  }
});

router.post("/:placeId", isAuthenticated, async (req, res, next) => {
  try {
    if (isValidObjectId(req.params.placeId)) {
      const exist = await Favorite.findOne({
        user: req.user._id,
        place: req.params.placeId,
      });
      if (exist) {
        await Favorite.findOneAndDelete({
          user: req.user._id,
          place: req.params.placeId,
        });
        return res.sendStatus(204);
      }
      await Favorite.create({
        user: req.user._id,
        place: req.params.placeId,
      });
      return res.sendStatus(201);
    }
    return sendStatus(400);
  } catch (error) {
    next(error);
  }
});
router.delete("/:placeId", isAuthenticated, async (req, res, next) => {
  try {
    await Favorite.findOneAndDelete({
      place: req.params.placeId,
      user: req.user._id,
    });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
