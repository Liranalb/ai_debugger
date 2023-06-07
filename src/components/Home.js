import React, { useState } from 'react';
import InputBox from './InputBox';
import SubmitButton from './SubmitBtn';
import Card from '../ui/Card';
import strings from '../strings/strings_eng.json'
import api_data from '../config/api_config.json'

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
      body: JSON.stringify({ code, logs }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.response);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
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
      <SubmitButton id="submit_button" buttonText={strings.submitButton} />
      <div>{response}</div>
    </form>
  );
}

export default Home;