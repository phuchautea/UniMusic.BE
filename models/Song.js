const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  duration: Number,
  file: String,
});

const songModel = mongoose.model("Songs", songSchema);

module.exports = songModel;
