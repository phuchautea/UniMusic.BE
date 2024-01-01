const mongoose = require("mongoose");
const User = require('./user.model');
const Song = require('./song.model');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: Song }],
});

const favoriteModel = mongoose.model("Favorite", favoriteSchema);

module.exports = favoriteModel;