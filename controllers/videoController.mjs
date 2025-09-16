import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../config/s3.mjs";
import Video from "../models/Video.mjs";

export const uploadVideo = async (req, res) => {
  try {
    const { userId = "anon", title = req.file.originalname } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const key = `videos/${userId}/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.B2_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await s3.send(command);

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

export const getSignedUploadUrl = async (req, res) => {
  try {
    const { filename, userId = "anon", contentType = "video/mp4" } = req.query;
    if (!filename) return res.status(400).json({ error: "filename required" });

    const key = `videos/${userId}/${Date.now()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.B2_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 900 });

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

export const getSignedDownloadUrl = async (req, res) => {
  try {
    const { key } = req.query;
    if (!key) return res.status(400).json({ error: "key required" });

    const command = new GetObjectCommand({
      Bucket: process.env.B2_BUCKET,
      Key: key,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 900 });
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
