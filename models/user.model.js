const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
