const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: { type: String },
    avatarUrl: { type: String },
    dob: { type: String },
    email: { type: String },
    password: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
    likedSongs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    playedSongs: [{ type: Schema.Types.ObjectId, ref: "Song" }]
}, {
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema);