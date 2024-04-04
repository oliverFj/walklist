import React, { useState } from 'react';
import pauseImage from '../Images/Pausebtn.png';
import playImage from '../Images/PlayBtn.png';

const ToggleButton = () => {
  // State to toggle between images
  const [isPaused, setIsPaused] = useState(true);

  // Function to toggle state
  const handleClick = () => {
    setIsPaused(!isPaused);
  };

  // Define the button text based on state
  const buttonText = isPaused ? "Pause recording" : "Start recording";

  return (
    <div className="flex flex-col items-center" style={{ width: '120px' }}> {/* Fixed width for the container */}
      <button onClick={handleClick} className="w-12 h-12 p-0 border-none bg-transparent">
        {/* Image with fixed size */}
        <img src={isPaused ? pauseImage : playImage} alt="Button" className="w-12 h-12" /> {/* Fixed width and height for the image */}
      </button>
      <p className="text-center text-white mt-2">{buttonText}</p> {/* Margin-top added to separate text from button */}
    </div>
  );
};

export default ToggleButton;
