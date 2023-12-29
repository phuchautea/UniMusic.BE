const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  targetUrl: String,
  startDate: Date,
  endDate: Date,
});

const adsModel = mongoose.model("Ads", adsSchema);

module.exports = adsModel;
