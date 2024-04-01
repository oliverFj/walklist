import React from 'react';
import buttonImage from '../Images/Recordbtn.png'; // Replace with the actual path to your image

const RecordButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="w-20 h-20 my-2 p-0 border-none bg-transparent">
      <img src={buttonImage} alt="Button" className="w-full h-full object-cover" />
    </button>
  );
};


export default RecordButton;
