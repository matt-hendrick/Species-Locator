import { render, screen } from '@testing-library/react';
import LeafletMap from './LeafletMap';
import { mockSpeciesSelected } from '../../utility/testing/mockData';

describe('LeafletMap tests', () => {
  it('renders Leaflet map when passed valid props', () => {
    render(
      <LeafletMap mapKey={13} className="MapID" center={[1, 3]} zoom={14} />
    );
    const displayedImage = document.querySelector('img');

    expect(displayedImage.src).toContain(
      'https://b.tile.openstreetmap.org/14/8328/8146.png'
    );

    expect(
      screen.getByRole(
        'heading',
        /Select a location and a species to view a heatmap of recent observations/i
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();

    expect(screen.getByText(/OpenStreetMap/i).closest('a')).toHaveAttribute(
      'href',
      'http://osm.org/copyright'
    );
  });

  it('renders Leaflet map when passed valid props', () => {
    render(
      <LeafletMap
        mapKey={10}
        className="MapID"
        center={[40, 72]}
        zoom={3}
        speciesSelected={mockSpeciesSelected}
      />
    );
    const displayedImage = document.querySelectorAll('img');

    expect(displayedImage[0].src).toContain(
      'https://c.tile.openstreetmap.org/3/5/3.png'
    );

    expect(displayedImage[1].src).toContain(
      'https://api.inaturalist.org/v1/colored_heatmap/3/5/3.png?color=blue&quality_grade=research&taxon_id=41636'
    );

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();

    expect(screen.getByText(/OpenStreetMap/i).closest('a')).toHaveAttribute(
      'href',
      'http://osm.org/copyright'
    );
  });
});
