
import React from 'react';
import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import Home from '../Home';
import api_data from '../../config/api_config.json';

test('Submit code and logs and fetch successfully', async () => {
  // Create a mock for fetch API
  const mockResponse = { response: "Mocked API response"};
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse)
  });

  render(<Home />)

  // Fill input boxes with code and logs and submit
  const input_code = screen.getByTestId('input_code');
  const input_logs = screen.getByTestId('input_logs');
  const submitButton = screen.getByTestId('submit_button');

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
  expect(screen.getByText('Mocked API response')).toBeInTheDocument();
});