import React from 'react';
import RecordButton from '../common/RecordButton.js';
import DropdownMenu from '../common/Dropdown.js';

const WalkListCreator = ({ onStartRecording }) => {
  return (
    <div className="walklist-creator bg-gray-600 slide-in-bottom absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-center items-center py-4" style={{ height: '200px' }}>
      <DropdownMenu 
        options={['Morning Walk', 'Workout Playlist', 'Road Trip', 'Party', 'Focus Playlist', 'Sleep']}
        placeholder="Select a playlist"   
      />
      <RecordButton onClick={onStartRecording} />
     
    </div>
  );
};

export default WalkListCreator;
