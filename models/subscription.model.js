const mongoose = require("mongoose");
const User = require('./user.model');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  plan: String,
  startDate: Date,
  endDate: Date,
});

const subscriptionModel = mongoose.model("Subscription", subscriptionSchema);

module.exports = subscriptionModel;