const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const genreModel = mongoose.model("Genre", genreSchema);

module.exports = genreModel;
