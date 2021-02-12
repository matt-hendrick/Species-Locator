import React from 'react';
import { render, screen, create } from '../../utility/testing/reduxTestUtils';
import GeoLocationButton from './GeoLocationButton';

describe('Recent Observations tests', () => {
  it('Renders GeoLocationButton with the text "Use My Location"', () => {
    navigator.geolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn(),
    };

    render(<GeoLocationButton />);

    expect(screen.getByText(/Use My Location/i)).toBeInTheDocument();
  });
});
