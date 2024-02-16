const mongoose = require("mongoose");
const Artist = require('./artist.model');
const Song = require('./song.model');

const albumSchema = new mongoose.Schema({
  title: String,
  slug: String,
  image: String,
  releaseDate: String,
  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: Artist }],
});

const albumModel = mongoose.model("Album", albumSchema);

module.exports = albumModel;