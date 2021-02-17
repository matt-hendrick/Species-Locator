import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar tests', () => {
  it('renders Species Locator text', () => {
    render(<Navbar />);
    expect(screen.getByText(/Species Locator/i));
  });
});
