import React, { useState, useEffect } from 'react';
import InputBox from './InputBox';
import ResponseBox from './ResponseBox';
import SubmitButton from './SubmitBtn';
import Card from '../ui/Card';
import strings from '../strings/strings_eng.json';
import api_data from '../config/api_config.json';

const Home = () => {
  const [code, setCode] = useState('');
  const [logs, setLogs] = useState('');
  const [response, setResponse] = useState('');
  
  const submitHandler = (event) => {
    event.preventDefault();

    fetch(api_data.api_address, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, logs })
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    scrollToResponse();
  }, [response]);

  const scrollToResponse = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <Card>
        <InputBox
          id="input_code"
          data-testid="input_code"
          placeholder={strings.inputBox.placeHolderCode}
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
      </Card>
      <Card>
        <InputBox
          id="input_logs"
          data-testid="input_logs"
          placeholder={strings.inputBox.placeHolderLogs}
          value={logs}
          onChange={(event) => setLogs(event.target.value)}
        />
      </Card>
      <SubmitButton id="submit_button" data-testid="submit_button" buttonText={strings.submitButton} />

      {response && (
        <Card>
          <ResponseBox value={response} />
        </Card>
      )}
    </form>
  );
};

export default Home;
