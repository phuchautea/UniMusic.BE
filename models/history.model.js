const mongoose = require("mongoose");
const User = require('./user.model');
const Song = require('./song.model');

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: Song }],
  timestamp: Date,
});

const historyModel = mongoose.model("History", historySchema);

module.exports = historyModel;