//WalkListDetails.js
import React from 'react';
import PlayButton from '../common/PlayButton.js';

const WalkListDetails = ({ title, songs = [], onPlayPress }) => {
  return (
    <div className="walklist-description bg-gray-600 slide-in-bottom absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-center items-center py-4" style={{ height: 'auto', padding: '20px' }}>
      <h2 className="text-white text-xl mb-4">{title}</h2>
      <div>
        {songs.map((song, index) => (
          <div key={index} className="text-white mb-2">{song}</div>
        ))}
      </div>
      <PlayButton onClick={onPlayPress} />
    </div>
  );
};


export default WalkListDetails;
