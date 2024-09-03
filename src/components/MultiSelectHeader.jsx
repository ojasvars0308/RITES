import React, { useState } from 'react';

const MultiSelectHeader = ({ label, options, onSelectionChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedOptions(selected);
    onSelectionChange(selected);
  };

  const clearSelection = () => {
    setSelectedOptions([]);
    onSelectionChange([]);
  };

  return (
    <div className="relative inline-block text-left">
      <label className="mr-2">{label}</label>
      <select
        multiple
        value={selectedOptions}
        onChange={handleSelectChange}
        className="p-1 border rounded"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {selectedOptions.length > 0 && (
        <button
          onClick={clearSelection}
          className="mt-2 ml-2 mb-2 p-1 bg-red-500 text-white text-sm rounded"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default MultiSelectHeader;