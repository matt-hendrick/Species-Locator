import React from 'react';
import { render, screen } from '../../redux_test-utils';
import MapDisplay from './MapDisplay';

test('Renders MapDisplay with no location or species selected', () => {
  render(<MapDisplay />);

  expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();

  expect(screen.getByText(/OpenStreetMap/i).closest('a')).toHaveAttribute(
    'href',
    'http://osm.org/copyright'
  );
});
