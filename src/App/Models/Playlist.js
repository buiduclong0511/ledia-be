const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaylistSchema = new mongoose.Schema({
    playlistName: { type: String },
    likesCount: { type: Number },
    type: { type: String },
    songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    poster: { type: Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
})

module.exports = mongoose.model("Playlist", PlaylistSchema);