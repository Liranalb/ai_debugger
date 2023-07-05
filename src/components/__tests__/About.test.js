import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import About from '../About';

test('renders App', () => {
  render(
    <Router>
      <About />
    </Router>
  );
});