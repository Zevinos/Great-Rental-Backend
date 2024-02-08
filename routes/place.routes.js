const router = require("express").Router();
const Place = require("../models/Place.model");

router.get("/", async (req, res, next) => {
  try {
    const allPlaces = await Place.find();
    res.json(allPlaces);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const onePlace = await Pet.findOne({
      _id: req.params.id,
    });
    res.json(onePlace);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Place.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!deleted) {
      return res.status(401).json({ message: "unauthorized" });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const createdPlace = await Place.create({
      country: req.body.country,
      city: req.body.city,
      name: req.body.name,
    });
    res.status(201).json({ id: createdPlace._id });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
