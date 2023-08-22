import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '../Home';
import api_data from '../../config/api_config.json';
import strings from '../../strings/strings_eng.json';

// Mock the scrollTo function
window.scrollTo = jest.fn();

describe('Home Component Tests', () => {
  // Test case for submitting code and logs and fetching successfully
  test('Submit code and logs and fetch successfully', async () => {
    // Create a mock response for the fetch API
    const mockResponse = { response: "Mocked API response" };

    // Mock the fetch API to return the mockResponse
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
    });

    render(<Home />);

    // Get input elements and submit button
    const input_code = screen.getByPlaceholderText(strings.inputBox.placeHolderCode);
    const input_logs = screen.getByPlaceholderText(strings.inputBox.placeHolderLogs);
    const submitButton = screen.getByText(strings.submitButton);

    // Simulate user input and click the submit button
    fireEvent.change(input_code, { target: { value: 'console.log("Hello, World!"); unexpected text..'}});
    fireEvent.change(input_logs, { target: { value: 'Uncaught SyntaxError: Unexpected identifier'}});
    fireEvent.click(submitButton);

    // Wait for the response to be displayed on the screen
    await waitFor(() => screen.getByText('Mocked API response'));

    // Check if the fetch API was called with the correct parameters
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

    // Check if the response is displayed on the screen
    expect(screen.getByText('Mocked API response')).toBeInTheDocument();
  });
});

// Clean up after all tests
afterAll(() => {
  jest.clearAllMocks();
});
