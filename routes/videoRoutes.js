const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  uploadVideo,
  getSignedUploadUrl,
  getSignedDownloadUrl,
  getUserVideos,
} = require("../controllers/videoController");

router.post("/upload", upload.single("video"), uploadVideo);
router.get("/sign-upload", getSignedUploadUrl);
router.get("/download", getSignedDownloadUrl);
router.get("/users/:id/videos", getUserVideos);

module.exports = router;
