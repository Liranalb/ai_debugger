import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  test('renders home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Assert that the Home component is rendered
    const homeElement = screen.getByText(/This is the home page/i);
    expect(homeElement).toBeInTheDocument();
  });

  test('renders about page', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    // Assert that the About component is rendered
    const aboutElement = screen.getByText(/This is the about page/i);
    expect(aboutElement).toBeInTheDocument();
  });
});
