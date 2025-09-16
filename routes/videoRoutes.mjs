import express from "express";
import uploadMiddleware from "../middleware/upload.mjs";
import { uploadVideo, getSignedUploadUrl, getSignedDownloadUrl, getUserVideos } from "../controllers/videoController.mjs";

const router = express.Router();

router.post("/upload", uploadMiddleware, uploadVideo);
router.get("/signed-upload", getSignedUploadUrl);
router.get("/signed-download", getSignedDownloadUrl);
router.get("/user/:id", getUserVideos);

export default router;
