import extractAudio from '../utils/extractAudio.js'
import  transcribeAudio  from '../utils/transcribeAudio.js';
import  summarizeText  from '../utils/summarizeText.js';
import Video from '../models/Video.js';

const processVideo = async (req, res) => {
  try {
    const videoPath = req.file.path;
    const audioPath = await extractAudio(videoPath);
    const transcript = await transcribeAudio(audioPath,videoPath);
    const summary = await summarizeText(transcript);

    const videoData = await Video.create({
      filename: req.file.filename,
      transcript,
      summary,
    });

    res.status(200).json(videoData);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Processing failed" });
  }
};

export default processVideo