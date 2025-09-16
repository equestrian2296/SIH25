import express from "express";
import multer from "multer";
import { uploadVideo, getSignedUploadUrl, getSignedDownloadUrl, getUserVideos } from "../controllers/videoController.mjs";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("video"), uploadVideo);
router.get("/signed-upload", getSignedUploadUrl);
router.get("/signed-download", getSignedDownloadUrl);
router.get("/user/:id", getUserVideos);

export default router;
