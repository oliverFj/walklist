// WalkListDetails.js
import React from 'react';

const WalkListDetails = ({ songs }) => {
  return (
    <div className="walklist-description bg-gray-600 slide-in-bottom absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-center items-center py-4" style={{ height: '200px' }}>
      <ul>
        {songs.map((song, index) => (
          <li key={index} className="text-white">{song}</li>
        ))}
      </ul>
    </div>
  );
};

export default WalkListDetails;