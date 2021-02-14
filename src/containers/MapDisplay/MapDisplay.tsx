import React, { Fragment } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './MapDisplay.css';

// Utility Functions
import { googleAnalytics } from '../../utility/utilityFunctions';

// Redux
import { useSelector } from 'react-redux';

// MUI
import Typography from '@material-ui/core/Typography';

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

  let leafletDisplay = null;
  let mapKey = null;
  let coordinates = [40.7812, -73.9665];

  if (!locationSelected && !speciesSelected && !userCoordinates) {
    leafletDisplay = (
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h6" component="h6">
          Select a location and a species to view a heatmap of recent
          observations
        </Typography>
        <MapContainer
          key={coordinates[0] + coordinates[1]}
          className="MapNoInfo"
          center={[coordinates[0], coordinates[1]]}
          zoom={14}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    );
  } else if (speciesSelected && !locationSelected && !userCoordinates) {
    mapKey = coordinates.join('') + speciesSelected.id;
    leafletDisplay = (
      <MapContainer
        key={mapKey}
        className="MapID"
        center={[coordinates[0], coordinates[1]]}
        zoom={2}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          attribution='<a href="https://www.inaturalist.org/">iNaturalist</a>'
          url={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?color=blue&quality_grade=research&taxon_id=${speciesSelected.id}`}
        />
      </MapContainer>
    );
  } else if (speciesSelected && locationSelected?.length > 0) {
    coordinates = [
      locationSelected[0]?.geometry.location.lat,
      locationSelected[0]?.geometry.location.lng,
    ];
    mapKey = coordinates.join('') + speciesSelected.id;
    leafletDisplay = (
      <MapContainer
        key={mapKey}
        className="MapID"
        center={[coordinates[0], coordinates[1]]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          attribution='<a href="https://www.inaturalist.org/">iNaturalist</a>'
          url={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?color=blue&quality_grade=research&taxon_id=${speciesSelected.id}`}
        />
      </MapContainer>
    );
  } else if (!speciesSelected && locationSelected?.length > 0) {
    mapKey = [
      locationSelected[0]?.geometry.location.lat,
      locationSelected[0]?.geometry.location.lng,
    ];
    leafletDisplay = (
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h6" component="h6">
          Select a location and a species to view a heatmap of recent
          observations
        </Typography>
        <MapContainer
          key={mapKey.join('')}
          className="MapID"
          center={[
            locationSelected[0]?.geometry.location.lat,
            locationSelected[0]?.geometry.location.lng,
          ]}
          zoom={14}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    );
  } else if (speciesSelected && userCoordinates) {
    coordinates = [userCoordinates[0], userCoordinates[1]];
    mapKey = coordinates.join('') + speciesSelected.id;
    leafletDisplay = (
      <MapContainer
        key={mapKey}
        className="MapID"
        center={[coordinates[0], coordinates[1]]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          attribution='<a href="https://www.inaturalist.org/">iNaturalist</a>'
          url={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?color=blue&quality_grade=research&taxon_id=${speciesSelected.id}`}
        />
      </MapContainer>
    );
  } else if (!speciesSelected && userCoordinates) {
    mapKey = [userCoordinates[0], userCoordinates[1]];
    leafletDisplay = (
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h6" component="h6">
          Select a location and a species to view a heatmap of recent
          observations
        </Typography>
        <MapContainer
          key={mapKey.join('')}
          className="MapID"
          center={[userCoordinates[0], userCoordinates[1]]}
          zoom={14}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    );
  }

  return <Fragment>{leafletDisplay}</Fragment>;
}

export default MapDisplay;
