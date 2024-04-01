import React, { useState } from 'react';
import pauseImage from '../Images/Pausebtn.png';
import recordImage from '../Images/Recordbtn.png';

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
      <button onClick={handleClick} className="w-20 h-20 p-0 border-none bg-transparent">
        {/* Image with fixed size */}
        <img src={isPaused ? pauseImage : recordImage} alt="Button" className="w-20 h-20" /> {/* Fixed width and height for the image */}
      </button>
      <p className="text-center text-white mt-2">{buttonText}</p> {/* Margin-top added to separate text from button */}
    </div>
  );
};

export default ToggleButton;
