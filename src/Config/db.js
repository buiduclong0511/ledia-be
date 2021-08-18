const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://tieulong0511:Lo2389ngitm@mediaplayercluster.ox8qf.mongodb.net/media_player_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connect successfully!");
    } catch (err) {
        console.log("Connect failure!");
        console.log("Error: ", err);
    }
}

module.exports = { connect };
