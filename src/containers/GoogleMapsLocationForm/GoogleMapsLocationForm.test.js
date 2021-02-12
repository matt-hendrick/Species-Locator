import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import GoogleMapsLocationForm from './GoogleMapsLocationForm';

describe('GoogleMapsLocationForm tests', () => {
  it('Renders GoogleMapsLocationForm with label text "Location Selector"', () => {
    render(<GoogleMapsLocationForm />);

    expect(screen.getByLabelText(/Location Selector/i)).toBeInTheDocument();
  });
});
