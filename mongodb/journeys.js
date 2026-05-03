const mongoose = require("mongoose");

const JourneySchema = new mongoose.Schema({
  title: String,
  description: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  photos: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Journey", JourneySchema);
