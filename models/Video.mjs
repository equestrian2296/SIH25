import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  filename: { type: String, required: true },
  b2Path: { type: String, required: true },
}, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);
export default Video;
