import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '../Home';
import api_data from '../../config/api_config.json';
import strings from '../../strings/strings_eng.json';
window.scrollTo = jest.fn();

describe('Home Component Tests', () => {
  test('Submit code and logs and fetch successfully', async () => {
    // Create a mock for fetch API
    const mockResponse = { response: "Mocked API response"};
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
    });

    render(<Home />)

    // Fill input boxes with code and logs and submit
    const input_code = screen.getByPlaceholderText(strings.inputBox.placeHolderCode);
    const input_logs = screen.getByPlaceholderText(strings.inputBox.placeHolderLogs);
    const submitButton = screen.getByText(strings.submitButton);

    fireEvent.change(input_code, { target: { value: 'console.log("Hello, World!"); unexpected text..'}});
    fireEvent.change(input_logs, { target: { value: 'Uncaught SyntaxError: Unexpected identifier'}});
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText('Mocked API response'));
    expect(global.fetch).toHaveBeenCalledWith(
      api_data.api_address,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: 'console.log("Hello, World!"); unexpected text..',
          logs: 'Uncaught SyntaxError: Unexpected identifier',
        }),
      }
    );
    expect(screen.getByText('Mocked API response')).toBeInTheDocument;
    
  });
});

afterAll(() => {
  jest.clearAllMocks();
});