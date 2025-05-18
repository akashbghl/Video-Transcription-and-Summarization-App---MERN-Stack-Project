import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-900/30 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="text-xl font-bold">🎥 Video Transcriber</div>
      <ul className="flex gap-6 text-sm">
        <li>
          <a href="/" className="hover:text-yellow-400 transition">Home</a>
        </li>
        <li>
          <a href="#upload" className="hover:text-yellow-400 transition">Upload</a>
        </li>
        <li>
          <a href="#about" className="hover:text-yellow-400 transition">About</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
