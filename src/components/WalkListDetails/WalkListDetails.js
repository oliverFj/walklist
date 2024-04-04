import React from 'react';
import PlayButton from '../common/PlayButton.js';

const WalkListDetails = ({ title, songs = [], onPlayPress }) => {
  return (
    <div className="walklist-description bg-gray-600 slide-in-bottom absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-center items-center py-4" style={{ height: 'auto', padding: '20px' }}>
      <h2 className="text-white text-xl mb-4">{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div className="songs-list-container custom-scrollbar mb-2" style={{ maxHeight: '150px', overflowY: 'auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {songs.map((song, index) => (
            <div key={index} className="text-white mb-2">{song}</div>
          ))}
        </div>
      </div>
      <PlayButton onClick={onPlayPress} />
    </div>
  );
};


export default WalkListDetails;
