import { useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import VideoUploadSection from './components/VideoUploadSection';
import TranscriptDisplay from './components/TranscriptDisplay';
import background from '/background.jpg'

function App() {
  // 🗄️ state to hold { filename, transcript, summary }
  const [result, setResult] = useState(null);
  const targetRef = useRef(null);

  return (
    <div 
          className="bg-cover"
          style={{backgroundImage : `url(${background})` }}>
      <Navbar />

      {/* pass setResult so the upload section can update it */}
      <VideoUploadSection setResult={setResult} scrollToRef={targetRef} />

      {/* pass the data down for display */}
      <TranscriptDisplay result={result} refProp={targetRef}  />
    </div>
  );
}

export default App;
