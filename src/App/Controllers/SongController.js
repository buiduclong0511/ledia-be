const Song = require('../Models/Song');
const cloudinary = require('../../Config/cloudinary');

class SongController {
    store = async (req, res) => {
        try {
            const body = req.body;
            const audioFile = req.files.audioFile;
            const thumbFile = req.files.thumb;
            const audio = await cloudinary.uploader.upload(audioFile[0].path, { resource_type: 'raw', public_id: `AudioUploads/${audioFile[0].originalname}` })
            const fileUrl = audio.url;
            const thumb = await cloudinary.uploader.upload(thumbFile[0].path, { resource_type: 'raw', public_id: `ImagesUploads/${thumbFile[0].originalname}` })
            const coverUrl = thumb.url;
            const newSong = new Song({
                songName: body.songName,
                singer: body.singer,
                lyrics: body.lyrics,
                author: body.author,
                poster: body.poster,
                type: body.type,
                coverUrl,
                fileUrl,
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
}

module.exports = new SongController;