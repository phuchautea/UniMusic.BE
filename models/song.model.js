const mongoose = require("mongoose");
const Artist = require('./artist.model');
const Album = require('./album.model');

const songSchema = new mongoose.Schema({
    title: String,
    duration: Number,
    file: String,
    artist: { type: mongoose.Schema.Types.ObjectId, ref: Artist },
    album: { type: mongoose.Schema.Types.ObjectId, ref: Album },
});

const songModel = mongoose.model("Song", songSchema);

module.exports = songModel;