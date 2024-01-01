const mongoose = require("mongoose");
const User = require('./user.model');
const Song = require('./song.model');

const playlistSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: Song }],
});

const playlistModel = mongoose.model("Playlist", playlistSchema);

module.exports = playlistModel;