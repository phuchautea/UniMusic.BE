const mongoose = require("mongoose");
const Role = require('./role.model');
// const Playlist = require('./playlist.model');
// const RecentlyPlayed = require('./recentlyPlayed.model');
// const Payment = require('./payment.model');
// const Subscription = require('./subscription.model');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: { type: mongoose.Schema.Types.ObjectId, ref: Role },
  // playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: Playlist }],
  // recentlyPlayed: [{ type: mongoose.Schema.Types.ObjectId, ref: RecentlyPlayed }],
  // payments: [{ type: mongoose.Schema.Types.ObjectId, ref: Payment }],
  // subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: Subscription }],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;