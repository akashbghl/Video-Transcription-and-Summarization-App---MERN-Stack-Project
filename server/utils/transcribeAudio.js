import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import fs from "fs";
import path from "path";

const ASSEMBLY_API_KEY = process.env.ASSEMBLYAI_API_KEY;

const transcribeAudio = async (audioPath, videoPath) => {
  try {
    // Step 1: Upload the audio file
    const audioData = fs.readFileSync(audioPath);

    const uploadRes = await axios.post(
      "https://api.assemblyai.com/v2/upload",
      audioData,
      {
        headers: {
          authorization: ASSEMBLY_API_KEY,
          "content-type": "application/octet-stream",
        },
      }
    );

    const audioUrl = uploadRes.data.upload_url;

    // Step 2: Request transcription
    const transcriptRes = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      {
        audio_url: audioUrl,
      },
      {
        headers: {
          authorization: ASSEMBLY_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    const transcriptId = transcriptRes.data.id;

    // Step 3: Poll for completion
    let transcriptData;
    while (true) {
      const pollingRes = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: {
            authorization: ASSEMBLY_API_KEY,
          },
        }
      );

      transcriptData = pollingRes.data;

      if (transcriptData.status === "completed") break;
      if (transcriptData.status === "error") throw new Error(transcriptData.error);

      await new Promise((resolve) => setTimeout(resolve, 3000)); // wait before retry
    }

    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }
    if(fs.existsSync(audioPath)){
      fs.unlinkSync(audioPath);
    }

    return transcriptData.text;
  } catch (err) {
    console.error("❌ Error with AssemblyAI transcription:", err.response?.data || err.message); 
        if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }
    if(fs.existsSync(audioPath)){
      fs.unlinkSync(audioPath);
    }
    return "⚠️ Transcription failed.";
  }
};

export default transcribeAudio;
