import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import GeoLocationButton from './GeoLocationButton';

describe('Recent Observations tests', () => {
  it('Renders GeoLocationButton with the text "Use My Location"', () => {
    render(<GeoLocationButton />);

    expect(screen.getByText(/Use My Location/i)).toBeInTheDocument();
  });
});
