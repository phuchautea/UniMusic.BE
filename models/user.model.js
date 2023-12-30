const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  role: { type: Schema.Types.ObjectId, ref: "Role" },
  playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
  recentlyPlayed: { type: Schema.Types.ObjectId, ref: "RecentlyPlayed" },
  payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
  subscriptions: [{ type: Schema.Types.ObjectId, ref: "Subscription" }]
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;