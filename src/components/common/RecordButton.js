import React from 'react';
import buttonImage from '../Images/Recordbtn.png'; // Replace with the actual path to your image

const RecordButton = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center mt-4" style={{ width: '120px' }}> {/* Fixed width for the container */}
    <button onClick={onClick} className="w-12 h-12 p-0 border-none bg-transparent">
      <img src={buttonImage} alt="Button" className="w-full h-full object-cover" />
    </button>
    <p className="text-center text-white mt-2">Start recording</p>
    </div>
  );
};


export default RecordButton;
