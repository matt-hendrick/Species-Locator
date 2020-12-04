import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders Species Locator text', () => {
  render(<Navbar />);
  expect(screen.getByText(/Species Locator/i));
});
