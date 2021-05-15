import React, { Fragment, ReactNode } from 'react';
import './MapDisplay.css';

// Utility Functions
import { googleAnalytics } from '../../utility/utilityFunctions';

// Redux
import { useSelector } from 'react-redux';

// Components
import LeafletMap from '../../components/LeafletMap/LeafletMap';

// Types
import { StateProps } from '../../utility/sharedTypes';

function MapDisplay() {
  googleAnalytics();

  const locationSelected = useSelector(
    (state: StateProps) => state.locationSelected
  );
  const speciesSelected = useSelector(
    (state: StateProps) => state.speciesSelected
  );
  const userCoordinates = useSelector(
    (state: StateProps) => state.userCoordinates
  );

  let leafletDisplay: ReactNode | null = null;
  let mapKey: string | number[] | null = null;
  let coordinates = [40.7812, -73.9665];

  if (!locationSelected && !speciesSelected && !userCoordinates) {
    leafletDisplay = (
      <LeafletMap
        mapKey={coordinates[0] + coordinates[1]}
        className="map-no-info"
        center={[coordinates[0], coordinates[1]]}
        zoom={14}
      />
    );
  } else if (speciesSelected && !locationSelected && !userCoordinates) {
    mapKey = coordinates.join('') + speciesSelected.id;
    leafletDisplay = (
      <LeafletMap
        mapKey={mapKey}
        className="map-id"
        center={[coordinates[0], coordinates[1]]}
        zoom={2}
        speciesSelected={speciesSelected}
      />
    );
  } else if (speciesSelected && locationSelected?.length > 0) {
    coordinates = [
      locationSelected[0]?.geometry.location.lat,
      locationSelected[0]?.geometry.location.lng,
    ];
    mapKey = coordinates.join('') + speciesSelected.id;
    leafletDisplay = (
      <LeafletMap
        mapKey={mapKey}
        className="map-id"
        center={[coordinates[0], coordinates[1]]}
        zoom={14}
        speciesSelected={speciesSelected}
      />
    );
  } else if (!speciesSelected && locationSelected?.length > 0) {
    mapKey = [
      locationSelected[0]?.geometry.location.lat,
      locationSelected[0]?.geometry.location.lng,
    ];
    leafletDisplay = (
      <LeafletMap
        mapKey={mapKey.join('')}
        className="map-id"
        center={[
          locationSelected[0]?.geometry.location.lat,
          locationSelected[0]?.geometry.location.lng,
        ]}
        zoom={14}
      />
    );
  } else if (speciesSelected && userCoordinates) {
    coordinates = [userCoordinates[0], userCoordinates[1]];
    mapKey = coordinates.join('') + speciesSelected.id;
    leafletDisplay = (
      <LeafletMap
        mapKey={mapKey}
        className="map-id"
        center={[coordinates[0], coordinates[1]]}
        zoom={14}
        speciesSelected={speciesSelected}
      />
    );
  } else if (!speciesSelected && userCoordinates) {
    mapKey = [userCoordinates[0], userCoordinates[1]];
    leafletDisplay = (
      <LeafletMap
        mapKey={mapKey.join('')}
        className="map-id"
        center={[userCoordinates[0], userCoordinates[1]]}
        zoom={14}
      />
    );
  }

  return <Fragment>{leafletDisplay}</Fragment>;
}

export default MapDisplay;
