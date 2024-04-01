import React from 'react';

// RoundedButton.js
const RoundedButton = ({ text, onClick }) => {
    return (
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 text-lg rounded-full absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50"
        onClick={onClick}
      >
        {text}
      </button>
    );
  };

export default RoundedButton;