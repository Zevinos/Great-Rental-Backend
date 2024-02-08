const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    picture: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
