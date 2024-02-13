const router = require("express").Router();
const Place = require("../models/Place.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

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
    const onePlace = await Place.findOne({
      _id: req.params.id,
    });
    if (!onePlace) {
      return res.status(401).json({ message: "unauthorized" });
    }
    res.json(onePlace);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const deleted = await Place.findOneAndDelete({
      _id: req.params.id,
      hostName: req.user._id,
    });
    if (!deleted) {
      return res.status(401).json({ message: "unauthorized" });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const createdPlace = await Place.create({
      hostName: req.user._id,
      country: req.body.country,
      city: req.body.city,
      name: req.body.name,
      description: req.body.description,
      capacity: req.body.capacity,
      bathrooms: req.body.bathrooms,
      bedrooms: req.body.bedrooms,
      price: req.body.price,
      img: req.body.img,
    });
    const allPlaces = await Place.find();
    allPlaces.unshift(createdPlace);
    await Promise.all(allPlaces.map((place) => place.save()));

    res.status(201).json({ id: createdPlace._id });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isAuthenticated, async (req, res, next) => {
  try {
    let {
      country,
      city,
      name,
      description,
      capacity,
      bathrooms,
      bedrooms,
      price,
      img,
    } = req.body;

    if (country === "") {
      country = undefined;
    }
    if (city === "") {
      city = undefined;
    }
    if (name === "") {
      name = undefined;
    }
    if (description === "") {
      description = undefined;
    }
    if (capacity === "") {
      capacity = undefined;
    }
    if (bathrooms === "") {
      bathrooms = undefined;
    }
    if (bedrooms === "") {
      bedrooms = undefined;
    }
    if (price === "") {
      price = undefined;
    }
    if (img === "") {
      img = undefined;
    }

    const updatedPlace = await Place.findOneAndUpdate(
      {
        _id: req.params.id,
        hostName: req.user._id,
      },
      {
        country,
        city,
        name,
        description,
        capacity,
        bathrooms,
        bedrooms,
        price,
        img,
      },
      {
        new: true,
      }
    );
    res.status(202).json(updatedPlace);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
