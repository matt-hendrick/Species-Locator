import React, { Fragment, ReactNode } from 'react';
import './MapDisplay.css';

// Utility Functions
import { googleAnalytics } from '../../utility/utilityFunctions';

// Redux
import { useSelector } from 'react-redux';

// Components
import LeatfletMap from '../../components/LeafletMap/LeatfletMap';

interface StateProps {
  locationSelected: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    formatted_address: string;
  }[];
  speciesSelected: {
    id: number;
    preferred_common_name: string;
    name: string;
    wikipedia_url: string;
    wikipediaURL: string | undefined;
    photos: {
      id: number;
      url: string;
    }[];
    observedDateTime: string;
    observationURL: string;
    observedLocation: string;
    locationIsObscured: boolean;
    coordinates: string;
    title: string;
    spottedBy: string;
    spottedByURL: string;
  };
  userCoordinates: number[];
  pageNumber: number;
}

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
      <LeatfletMap
        key={coordinates[0] + coordinates[1]}
        className="MapNoInfo"
        center={[coordinates[0], coordinates[1]]}
        zoom={14}
      />
    );
  } else if (speciesSelected && !locationSelected && !userCoordinates) {
    mapKey = coordinates.join('') + speciesSelected.id;
    leafletDisplay = (
      <LeatfletMap
        key={mapKey}
        className="MapID"
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
      <LeatfletMap
        key={mapKey}
        className="MapID"
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
      <LeatfletMap
        key={mapKey.join('')}
        className="MapID"
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
      <LeatfletMap
        key={mapKey}
        className="MapID"
        center={[coordinates[0], coordinates[1]]}
        zoom={14}
        speciesSelected={speciesSelected}
      />
    );
  } else if (!speciesSelected && userCoordinates) {
    mapKey = [userCoordinates[0], userCoordinates[1]];
    leafletDisplay = (
      <LeatfletMap
        key={mapKey.join('')}
        className="MapID"
        center={[userCoordinates[0], userCoordinates[1]]}
        zoom={14}
      />
    );
  }

  return <Fragment>{leafletDisplay}</Fragment>;
}

export default MapDisplay;
