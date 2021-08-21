const slug = require('slug');

const Song = require('../Models/Song');
const cloudinary = require('../../Config/cloudinary');

class SongController {
    // [POST] /songs
    store = async (req, res) => {
        try {
            const body = req.body;
            const audioFile = req.files.audioFile;
            const thumbFile = req.files.thumb;
            const audio = await cloudinary.uploader.upload(audioFile[0].path, { resource_type: 'raw', public_id: `AudioUploads/${Date.now()}-${audioFile[0].originalname}` })
            const fileUrl = audio.url;
            const thumb = await cloudinary.uploader.upload(thumbFile[0].path, { resource_type: 'raw', public_id: `ImagesUploads/${Date.now()}-${thumbFile[0].originalname}` })
            const coverUrl = thumb.url;
            const newSong = new Song({
                songName: body.songName,
                singer: body.singer,
                lyrics: body.lyrics,
                author: body.author,
                poster: body.poster,
                likedsCount: 0,
                viewsCount: 0,
                coverUrl,
                fileUrl
            });
            
            const savedSong = await newSong.save();
            res.json({
                savedSong
            });
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }

    // [GET] /show
    show = async (req, res) => {
        try {
            const { all, q, page } = req.query;
            if (!all && !q) {
                res.status(400).json();
                return;
            }

            let songs;
            if (q) {
                if (all === "true") {
                    songs = await Song.find({
                        slug: {
                            $regex: slug(q),
                            $options: "i"
                        }
                    })
                    .sort({ viewsCount: -1 });
                } else if (!all) {
                    if (page) {
                        songs = await Song.find({
                            slug: {
                                $regex: slug(q),
                                $options: "i"
                            }
                        })
                        .sort({ viewsCount: -1 })
                        .skip((Number(page) - 1) * 6)
                        .limit(6);
                    } else {
                        songs = await Song.find({
                            slug: {
                                $regex: slug(q),
                                $options: "i"
                            }
                        })
                        .sort({ viewsCount: -1 })
                        .limit(3);
                    }
                } else {
                    res.status(400).json();
                    return;
                }
            } else {
                songs = await Song.find()
                .sort({ viewsCount: -1 })
                .limit(6);
            }
            res.json({
                songs
            });
        } catch (err) {
            res.status(500).json();
        }
    }
}

module.exports = new SongController;