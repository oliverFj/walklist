import React from 'react';
import spotifyLogo from '../Images/Spotify.png'; // Make sure this path is correct

const SpotifyButton = ({ onLogin }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center justify-center gap-2 hover:shadow-none transition duration-300 ease-in-out max-w-xs"
        onClick={onLogin}
      >
        <img src={spotifyLogo} alt="Spotify Logo" className="h-8 w-8" />
        <span>Connect to Spotify</span>
      </button>
    </div>
  );
};

export default SpotifyButton;