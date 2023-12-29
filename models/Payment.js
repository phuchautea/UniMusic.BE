const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  timestamp: Date,
});

const paymentModel = mongoose.model("Payment", paymentSchema);

module.exports = paymentModel;
