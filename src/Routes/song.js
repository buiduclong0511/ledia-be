const express = require("express");

const songController = require("../App/Controllers/SongController");
const verifyToken = require("../MiddleWares/verifyToken");
const upload = require("../Config/multer");

const router = express.Router();

router.post("/", verifyToken, upload.fields([
    { name: "thumb", maxCount: 1 },
    { name: "audioFile", maxCount: 1 }
]), songController.store)

module.exports = router;