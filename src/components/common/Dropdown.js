import { useState } from 'react';

const DropdownMenu = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" style={{ width: '200px' }}> {/* Fixed width for the dropdown */}
      <button
        className="bg-white border border-gray-300 rounded-md py-2 px-4 w-full text-left flex items-center justify-between"
        onClick={toggleDropdown}
      >
        {selectedOption || placeholder}
        <span className="material-icons">expand_more</span>
      </button>
      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded-md w-full top-0 transform translate-y-[-100%] z-10"> {/* Adjusted for upward expansion */}
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
