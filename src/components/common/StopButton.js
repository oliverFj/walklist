import React from 'react';
import buttonImage from '../Images/Stopbtn.png'; // Replace with the actual path to your image

const StopButton = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center" style={{ width: '120px' }}> {/* Fixed width for the container */}
    <button onClick={onClick} className="w-20 h-20 p-0 border-none bg-transparent">
      <img src={buttonImage} alt="Button" className="w-20 h-20" />
    </button>
    <p className="text-center text-white mt-2">Stop recording</p>
    </div>
  );
};

export default StopButton;
