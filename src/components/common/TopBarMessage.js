import React from 'react';

const TopBarMessage = ({ text }) => {
  return (
    
    <div className="text-white bg-black p-2 text-xl text-center h-12">
      {text}
    </div>
  );
};

export default TopBarMessage;