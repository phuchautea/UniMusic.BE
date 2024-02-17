const mongoose = require("mongoose");
const Album = require('./album.model');

const artistSchema = new mongoose.Schema({
  name: String,
  bio: String,
  image: String,
  slug: String,
  // albums: [{ type: mongoose.Schema.Types.ObjectId, ref: Album }],
});

const artistModel = mongoose.model("Artist", artistSchema);

module.exports = artistModel;