import React, { useEffect, useRef, useState } from 'react';
import StopButton from '../common/StopButton.js';
import ToggleButton from '../common/PauseButtonPlay.js';
import walkListMusic from './music.mp3';

const WalkListPlaying = ({ onDonePlaying, onPause, onResume }) => {
  const audioRef = useRef(new Audio(walkListMusic));
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      audioRef.current.pause();
      onPause(); // Call onPause prop function to set animationControl to 'pause' in App.js
    } else {
      audioRef.current.play().catch(error => console.error('Error playing audio:', error));
      onResume(); // Call onResume prop function to set animationControl to 'resume' in App.js
    }

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [isPaused, onPause, onResume]);

  const handleToggle = () => setIsPaused(!isPaused);

  return (
    <div className="walklist-creator bg-gray-600 absolute bottom-0 left-0 right-0 z-50 flex justify-center items-center py-4" style={{ height: '200px' }}>
      {/* Blue Circle centered on the screen */}
      <div className="blue-circle" style={{
        width: '10px',
        height: '10px',
        backgroundColor: 'blue',
        borderRadius: '50%',
        position: 'fixed', // Use fixed positioning for viewport-relative positioning
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}></div>
      {/* Controls */}
      <div className="flex flex-col items-center mx-2">
        <ToggleButton onToggle={handleToggle} buttonText1='Pause Walk' buttonText2='Resume Walk' isPaused={isPaused} />
      </div>
      <div className="flex flex-col items-center mx-2">
        <StopButton onClick={() => {
          onDonePlaying();
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }} buttonText="End Walk" />
      </div>
    </div>
  );
};

export default WalkListPlaying;
