const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const PlaylistSchema = new mongoose.Schema({
    playlistName: { type: String },
    likesCount: { type: Number },
    type: { type: String },
    songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    poster: { type: Schema.Types.ObjectId, ref: "User" },
    slug: { type: String, slug: "playlistName", unique: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("Playlist", PlaylistSchema);