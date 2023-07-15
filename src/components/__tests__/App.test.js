import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../App';

test('renders App', () => {
  render(
    <Router>
      <App />
    </Router>
  );
});