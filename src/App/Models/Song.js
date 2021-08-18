const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const SongSchema = new mongoose.Schema({
    songName: { type: String },
    singer: { type: String },
    lyrics: { type: String },
    author: { type: String },
    poster: { type: Schema.Types.ObjectId, ref: "User" },
    likedsCount: { type: Number },
    viewsCount: { type: Number },
    type: { type: String },
    coverUrl: { type: String },
    fileUrl: { type: String },
    slug: { type: String, slug: "songName", unique: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("Song", SongSchema);