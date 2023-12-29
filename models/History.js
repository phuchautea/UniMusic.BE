const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Songs" }],
  timestamp: Date,
});

const historyModel = mongoose.model("Histories", historySchema);

module.exports = historyModel;
