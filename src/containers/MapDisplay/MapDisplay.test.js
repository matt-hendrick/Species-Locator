import React from 'react';
import {
  render,
  screen,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from '../../utility/testing/reduxTestUtils';
import MapDisplay from './MapDisplay';
import {
  mockLocationSelected,
  mockSpeciesSelected,
  mockUserCoordinates,
} from '../../utility/testing/mockData';

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

  it('Renders Leaflet map when passed mockLocationSelected', async () => {
    render(<MapDisplay />, {
      initialState: { locationSelected: mockLocationSelected },
    });

    const displayedImage = document.querySelector('img');
    await waitFor(() =>
      expect(displayedImage.src).toContain(
        'https://a.tile.openstreetmap.org/14/4825/6155.png'
      )
    );
  });

  it('Renders Leaflet map when passed mockSpeciesSelected', async () => {
    render(<MapDisplay />, {
      initialState: {
        speciesSelected: mockSpeciesSelected,
      },
    });

    screen.debug();

    await waitForElementToBeRemoved(() =>
      screen.queryByText(
        /Select a location and a species to view a heatmap of recent observations/i
      )
    );
  });
});
