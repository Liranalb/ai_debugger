import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../Home';

test('renders App', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
});