const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    foodType: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String,
      required: true,
      trim: true,
    },
    cookingTime: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    donorToAdminMsg: {
      type: String,
      trim: true,
    },
    adminToAgentMsg: {
      type: String,
      trim: true,
    },
    collectionTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "accepted", "assigned", "collected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports =
  mongoose.models.Donation || mongoose.model("Donation", donationSchema);