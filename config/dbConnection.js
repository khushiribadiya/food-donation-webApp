const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongo:CMSpaGoibaKNCFwLYWNLNwjYnIiWYuIV@monorail.proxy.rlwy.net:34982/food_donation");
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;