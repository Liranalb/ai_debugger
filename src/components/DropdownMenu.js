import React, { useState } from "react";
import "./DropdownMenu.css"; // Import a custom CSS file for styling (create this file if it doesn't exist)
const config = require("../config/prompt_config.json");

const DropdownMenu = () => {
    const codeGuidanceFlavors = Object.values(config.CODE_FLAVOR);
    const [selectedOption, setSelectedOption] = useState(
        codeGuidanceFlavors[0].value
    ); // Set the default selected option

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="center">
            <div className="dropdown-container">
                <h1 className="dropdown-label">Choose a filter:</h1>
                <select
                    className="select-style"
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    {codeGuidanceFlavors.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DropdownMenu;
