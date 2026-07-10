const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    joinedTime: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["admin", "donor", "agent"],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);