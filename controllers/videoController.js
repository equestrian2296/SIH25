const s3 = require("../config/s3");
const Video = require("../models/Video");

exports.uploadVideo = async (req, res) => {
  try {
    const { userId = "anon", title = req.file.originalname } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const key = `videos/${userId}/${Date.now()}-${file.originalname}`;

    await s3.putObject({
      Bucket: process.env.B2_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }).promise();

    const video = await Video.create({
      userId,
      title,
      filename: file.originalname,
      b2Path: key,
    });

    res.json({ ok: true, video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSignedUploadUrl = async (req, res) => {
  try {
    const { filename, userId = "anon", contentType = "video/mp4" } = req.query;
    if (!filename) return res.status(400).json({ error: "filename required" });

    const key = `videos/${userId}/${Date.now()}-${filename}`;

    const uploadUrl = s3.getSignedUrl("putObject", {
      Bucket: process.env.B2_BUCKET,
      Key: key,
      Expires: 15 * 60,
      ContentType: contentType,
    });

    const videoDoc = await Video.create({
      userId,
      title: filename,
      filename,
      b2Path: key,
    });

    res.json({ uploadUrl, key, videoId: videoDoc._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getSignedDownloadUrl = async (req, res) => {
  try {
    const { key } = req.query;
    if (!key) return res.status(400).json({ error: "key required" });

    const url = s3.getSignedUrl("getObject", {
      Bucket: process.env.B2_BUCKET,
      Key: key,
      Expires: 15 * 60,
    });
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
