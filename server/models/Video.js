import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  filename: String,
  transcript: String,
  summary: String,
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

export default Video