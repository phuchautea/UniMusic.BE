const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  song: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
  text: String,
  timestamp: Date,
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
