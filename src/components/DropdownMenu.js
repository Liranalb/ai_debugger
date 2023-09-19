import React, { useState } from 'react';
import './DropdownMenu.css'; // Import a custom CSS file for styling (create this file if it doesn't exist)
const config = require('../config/prompt_config.json');

const DropdownMenu = () => {
  const actRoles = Object.keys(config.CODE_GUIDANCE);
  const [selectedOption, setSelectedOption] = useState(actRoles[0]); // Set the default selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="center">
      <div className="dropdown-container">
        <h1 className="dropdown-label">Choose a filter:   </h1>
        <select
          className="select-style"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {actRoles.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownMenu;
