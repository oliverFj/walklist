import React from 'react';
import buttonImage from '../Images/PlayBtn.png'; // Replace with the actual path to your image

const PlayButton = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center" style={{ width: '120px' }}> {/* Fixed width for the container */}
    <button onClick={onClick} className="w-12 h-12 p-0 border-none bg-transparent">
      <img src={buttonImage} alt="Button" className="w-12 h-12" />
    </button>
    <p className="text-center text-white mt-2">Start Walk-List</p>
    </div>
  );
};

export default PlayButton;
