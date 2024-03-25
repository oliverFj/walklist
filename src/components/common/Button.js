import React from 'react';

// You can extend this component to accept more props as needed.
const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;