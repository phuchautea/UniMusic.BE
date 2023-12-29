const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlists" }],
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
