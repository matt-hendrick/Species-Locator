import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import GoogleMapsLocationForm from './GoogleMapsLocationForm';

test('Renders GoogleMapsLocationForm with label text "Location Selector"', () => {
  render(<GoogleMapsLocationForm />);

  expect(screen.getByLabelText(/Location Selector/i)).toBeInTheDocument();
});
