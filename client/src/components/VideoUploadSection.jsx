import React, { useState } from 'react';
import axios from 'axios';

const VideoUploadSection = ({ setResult, scrollToRef }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestComplete, setRequestComplete] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert("Please select a video first.");

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      setLoading(true);
      const res = await axios.post("https://video-transcription-and-summarization.onrender.com/api/upload", formData);
      setResult(res.data);
      setRequestComplete(true);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full h-158 flex items-center justify-center px-4 py-20"
      id="upload"
    >
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Your Video</h2>
        <p className="text-gray-600 mb-6">
          We’ll transcribe and summarize it automatically for you.
        </p>

        <form onSubmit={handleUpload} className="flex flex-col gap-5 items-center">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-medium
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-md font-medium shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Upload & Transcribe"}
          </button>
          {requestComplete ?
            <button
              type='button'
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full cursor-pointer font-medium shadow-md hover:opacity-90 transition disabled:opacity-50"
              onClick={() => { scrollToRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              See Results
            </button>
            :
            ""
          }
        </form>
      </div>
    </section>
  );
};

export default VideoUploadSection;
