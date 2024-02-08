const { Schema, model } = require("mongoose");

const placeSchema = new Schema({
  country: { type: String, require: true },
  city: { type: String, require: true },
  description: { type: String },
  hostName: { type: Schema.Types.ObjectId, ref: "User" },
  price: { type: Number },
  capacity: Number,
  bathroom: Number,
  bedroom: Number,
  url: String,
});

const User = model("Place", placeSchema);

module.exports = place;
