import React from 'react';
import pauseImage from '../Images/Pausebtn.png';
import playImage from '../Images/PlayBtn.png';

const ToggleButton = ({ onToggle, buttonText1 = 'Pause Walk', buttonText2 = 'Resume Walk' }) => {
  // State to toggle between images and text
  const [isPaused, setIsPaused] = React.useState(false);

  // Function to handle click and inform parent component
  const handleClick = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);
    onToggle(newPausedState); // Call the passed function with the new state
  };

  // Define the button text and image based on state
  const buttonText = isPaused ? buttonText2 : buttonText1;
  const buttonImage = isPaused ? playImage : pauseImage;

  return (
    <div className="flex flex-col items-center" style={{ width: '120px' }}> {/* Fixed width for the container */}
      <button onClick={handleClick} className="w-12 h-12 p-0 border-none bg-transparent">
        {/* Image with fixed size */}
        <img src={buttonImage} alt="Toggle" className="w-12 h-12" /> {/* Fixed width and height for the image */}
      </button>
      <p className="text-center text-white mt-2">{buttonText}</p> {/* Margin-top added to separate text from button */}
    </div>
  );
};

export default ToggleButton;
