const mongoose = require("mongoose");

const recentlyPlayedSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  timestamp: Date,
});

const recentlyPlayedModel = mongoose.model(
  "RecentlyPlayeds",
  recentlyPlayedSchema
);

module.exports = recentlyPlayedModel;
