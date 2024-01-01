const mongoose = require("mongoose");
const Artist = require('./artist.model');
const Song = require('./song.model');

const albumSchema = new mongoose.Schema({
  title: String,
  artist: { type: mongoose.Schema.Types.ObjectId, ref: Artist },
  releaseDate: Date,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: Song }],
});

const albumModel = mongoose.model("Album", albumSchema);

module.exports = albumModel;