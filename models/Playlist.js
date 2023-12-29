const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Songs" }],
});

const playlistModel = mongoose.model("Playlists", playlistSchema);

module.exports = playlistModel;
