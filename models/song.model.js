const mongoose = require("mongoose");
const Artist = require('./artist.model');
const Album = require('./album.model');
const Genre = require('./genre.model');

const songSchema = new mongoose.Schema({
    title: String,
    slug: String,
    image: String,
    releaseDate: Date,
    sound: String,
    lyrics: String,
    rawLyrics: String,
    playCount: Number,
    artist: { type: mongoose.Schema.Types.ObjectId, ref: Artist },
    album: { type: mongoose.Schema.Types.ObjectId, ref: Album },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: Genre },
});


const songModel = mongoose.model("Song", songSchema);

module.exports = songModel;