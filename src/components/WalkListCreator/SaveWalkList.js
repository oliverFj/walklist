import React, { useState } from 'react';

const SaveWalkList = ({onSaved}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your save logic here
    console.log('Saving walk-list with name:', name, 'and description:', description);
  };

  return (
    <div className="walklist-creator bg-gray-600 absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-center items-center py-4" style={{ height: '300px' }}>
      <form onSubmit={handleSubmit} className="w-full max-w-md px-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Walk-list Name"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-white text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="A short note..."
          />
        </div>
        <div className="flex items-center justify-center">
            <button
                onClick={onSaved}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Save
            </button>
        </div>
      </form>
    </div>
  );
};

export default SaveWalkList;
