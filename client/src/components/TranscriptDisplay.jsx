import React from 'react';

const TranscriptDisplay = ({ result , refProp }) => {
  if (!result) return null;

  const { filename, transcript, summary } = result;

  return (
    <section ref={refProp} className="bg-white py-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Transcription Result
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">📁 Filename</h3>
          <p className="bg-gray-100 p-4 rounded-md text-gray-800">{filename}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">📝 Transcript</h3>
          <p className="bg-gray-50 p-4 rounded-md text-gray-700 whitespace-pre-line">
            {transcript}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">🧠 Summary</h3>
          <p className="bg-gray-50 p-4 rounded-md text-gray-700 whitespace-pre-line">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TranscriptDisplay;
 