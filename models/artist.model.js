const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: String,
  bio: String,
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
});

const artistModel = mongoose.model("Artist", artistSchema);

module.exports = artistModel;
