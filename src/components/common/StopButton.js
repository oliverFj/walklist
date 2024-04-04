// StopButton.js
import React from 'react';
import buttonImage from '../Images/Stopbtn.png';

const StopButton = ({ onClick, buttonText = 'Stop' }) => {
  return (
    <div className="flex flex-col items-center" style={{ width: '120px' }}>
      <button onClick={onClick} className="w-12 h-12 p-0 border-none bg-transparent">
        <img src={buttonImage} alt="Stop Button" className="w-12 h-12" />
      </button>
      <p className="text-center text-white mt-2">{buttonText}</p>
    </div>
  );
};

export default StopButton;
