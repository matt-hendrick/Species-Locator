import React from 'react';
import { render, screen, cleanup } from '../../utility/testing/reduxTestUtils';
import MapDisplay from './MapDisplay';
import { mockLocationSelected } from '../../utility/testing/mockData';

describe('MapDisplay tests', () => {
  afterEach(cleanup);

  it('Renders MapDisplay with no location or species selected', () => {
    render(<MapDisplay />);

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();

    expect(screen.getByText(/OpenStreetMap/i).closest('a')).toHaveAttribute(
      'href',
      'http://osm.org/copyright'
    );
  });

  it('Renders Leaflet map when passed mockLocationSelected', () => {
    render(<MapDisplay />, {
      initialState: { locationSelected: mockLocationSelected[0] },
    });

    const displayedImage = document.querySelector('img');

    expect(displayedImage?.src).toContain(
      'https://a.tile.openstreetmap.org/14/4825/6155.png'
    );
  });
});
