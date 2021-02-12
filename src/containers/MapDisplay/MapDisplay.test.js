import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import MapDisplay from './MapDisplay';

describe('MapDisplay tests', () => {
  it('Renders MapDisplay with no location or species selected', () => {
    render(<MapDisplay />);

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();

    expect(screen.getByText(/OpenStreetMap/i).closest('a')).toHaveAttribute(
      'href',
      'http://osm.org/copyright'
    );
  });
});
