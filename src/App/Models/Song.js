const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new mongoose.Schema({
    songName: { type: String },
    singer: { type: String },
    lyrics: { type: String },
    author: { type: String },
    poster: { type: Schema.Types.ObjectId, ref: "User" },
    likeds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    viewsCount: { type: Number },
    type: { type: String },
    coverUrl: { type: String },
    fileUrl: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model("Song", SongSchema);