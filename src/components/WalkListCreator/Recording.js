import React from 'react';
import StopButton from '../common/StopButton.js';
import PauseButton from '../common/PauseButton.js';

const Recording = ({onDoneRecording}) => {
  return (
    <div className="walklist-creator bg-gray-600 absolute bottom-0 left-0 right-0 z-50 flex justify-center items-center py-4" style={{ height: '200px' }}>
      <div className="flex flex-col items-center mx-2">
        <PauseButton />     
      </div>
      <div className="flex flex-col items-center mx-2">
        <StopButton onClick={onDoneRecording}/>      
      </div>
    </div>
  );
};

export default Recording;
