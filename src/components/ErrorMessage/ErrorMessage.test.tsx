import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('LeafletMap tests', () => {
  it('renders Error Message properly when valid props passed', () => {
    render(<ErrorMessage>Test Error Message</ErrorMessage>);
    expect(
      screen.getByText(/Something went wrong. test error message/i)
    ).toBeInTheDocument();
  });
});
