const { model, Schema } = require("mongoose");

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
});

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
