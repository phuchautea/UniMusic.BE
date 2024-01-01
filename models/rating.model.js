const mongoose = require("mongoose");
const User = require('./user.model');
const Song = require('./song.model');

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  song: { type: mongoose.Schema.Types.ObjectId, ref: Song },
  rating: Number,
});

const ratingModel = mongoose.model("Rating", ratingSchema);

module.exports = ratingModel;