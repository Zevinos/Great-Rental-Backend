const { Schema, model } = require("mongoose");

const placeSchema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  name: String,
  space: String,
  description: { type: String, required: true },
  rules: String,
  hostName: { type: Schema.Types.ObjectId, ref: "User" },
  property: String,
  capacity: { type: Number, min: 0, required: true },
  bathrooms: { type: Number, min: 0, required: true },
  bedrooms: Number,
  price: { type: Number, min: 0, required: true },
  cleaningFee: Number,
  reviewrating: Number,
  img: String,
});

const Place = model("Place", placeSchema);

module.exports = Place;
