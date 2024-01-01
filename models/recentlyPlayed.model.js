const mongoose = require("mongoose");
const User = require('./user.model');
const Song = require('./song.model');

const recentlyPlayedSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: Song }],
  timestamp: Date,
});

const recentlyPlayedModel = mongoose.model("RecentlyPlayed", recentlyPlayedSchema);

module.exports = recentlyPlayedModel;