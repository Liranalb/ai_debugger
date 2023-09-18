import React, { useState } from 'react';
const config = require('../config/apiReqConfig.json');

const DropdownMenu = () => {
  const actRoles = Object.keys(config.ACT);
  const [selectedOption, setSelectedOption] = useState(actRoles[0]); // Set the default selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        {actRoles.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
