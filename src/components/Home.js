import React, { useState, useEffect } from "react";

// Import custom components
import InputBox from "./InputBox";
import ResponseBox from "./ResponseBox";
import SubmitButton from "./SubmitBtn";
import Card from "../ui/Card";
import DropdownMenu from "./DropdownMenu"; // Import the DropdownMenu component

// Import strings and API configuration
import strings from "../strings/strings_eng.json";
import api_data from "../config/api_config.json";

const Home = () => {
    // States to manage input values and API response
    const [code, setCode] = useState("");
    const [logs, setLogs] = useState("");
    const [flavor, setFlavor] = useState(""); // flavor = the filter's DropDownMenu value

    const [response, setResponse] = useState("");
    // Handles form submission
    const submitHandler = (event) => {
        event.preventDefault();

        // Post code and logs to server
        fetch(api_data.api_address, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, logs, flavor }),
        })
            .then((response) => {
                if (!response.ok) {
                    const errorMsg =
                        "Failed to fetch! Status code: " +
                        response.status +
                        " (" +
                        response.statusText +
                        ")";
                    throw new Error(errorMsg);
                }
                return response.json();
            })
            .then((data) => {
                setResponse(data.response);
            })
            .catch((error) => {
                setResponse(error);
            });
    };

    // Scroll to the response when it changes
    useEffect(() => {
        scrollToResponse();
    }, [response]);

    const scrollToResponse = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <form onSubmit={submitHandler}>
            <Card>
                <InputBox
                    id="input_code"
                    placeholder={strings.inputBox.placeHolderCode}
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                />
            </Card>
            <Card>
                <InputBox
                    id="input_logs"
                    placeholder={strings.inputBox.placeHolderLogs}
                    value={logs}
                    onChange={(event) => setLogs(event.target.value)}
                />
            </Card>
            <div className="center">
                <DropdownMenu 
                    value={flavor}
                    onSelectMenuItem={(menuItem) => setFlavor(menuItem)}
                />
                <SubmitButton
                    id="submit_button"
                    buttonText={strings.submitButton}
                />
            </div>

            {/* Display the response if available */}
            {response && (
                <Card>
                    <ResponseBox value={response} />
                </Card>
            )}
        </form>
    );
};

export default Home;
