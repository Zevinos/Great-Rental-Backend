require("dotenv/config");
require("./../db");
const data = require("./cleanedData.json");
const Place = require("./../models/Place.model");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

const password = "1234";
const hash = bcrypt.hashSync(password, 10);
User.deleteMany().then(() => {
  User.create({
    name: "Eric",
    email: "eric1@mail.com",
    password: hash,
  }).then((user) => {
    data.forEach((el) => {
      el.hostName = user._id;
    });
    Place.deleteMany().then(() => {
      Place.create(data).then((res) => {
        console.log(`Created ${res.length} places`);
        process.exit();
      });
    });
  });
});
