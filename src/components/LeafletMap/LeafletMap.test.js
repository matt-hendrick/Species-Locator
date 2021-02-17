import { render, screen, waitFor } from '@testing-library/react';
import LeafletMap from './LeafletMap';

describe('LeafletMap tests', () => {
  it('renders Leaflet map when passed valid props', () => {
    render(
      <LeafletMap mapKey={13} className="MapID" center={[1, 3]} zoom={14} />
    );
    const displayedImage = document.querySelector('img');

    expect(displayedImage.src).toContain(
      'https://b.tile.openstreetmap.org/14/8328/8146.png'
    );
  });
});
