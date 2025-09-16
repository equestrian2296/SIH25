const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  userId: String,
  title: String,
  filename: String,
  b2Path: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", VideoSchema);
