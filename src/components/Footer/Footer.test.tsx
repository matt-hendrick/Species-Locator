import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('LeafletMap tests', () => {
  it('renders iNaturalist link', () => {
    render(<Footer />);
    expect(screen.getByText("iNaturalist's").closest('a')).toHaveAttribute(
      'href',
      'https://www.inaturalist.org'
    );
  });
});
