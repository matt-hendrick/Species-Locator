import React, { Fragment } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import * as classes from './MapDisplay.module.css';

// Utility Functions
import { googleAnalytics } from '../../utility/utilityFunctions';

// Redux
import { useSelector } from 'react-redux';

// MUI
import Typography from '@material-ui/core/Typography';

function MapDisplay() {
  googleAnalytics();

  const locationSelected = useSelector((state) => state.locationSelected);
  const speciesSelected = useSelector((state) => state.speciesSelected);
  const userCoordinates = useSelector((state) => state.userCoordinates);

  let leafletDisplay = null;
  let mapKey = null;
  let coordinates = ['40.7812', '-73.9665'];

  if (!locationSelected && !speciesSelected && !userCoordinates) {
    leafletDisplay = (
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h6" component="h6">
          Select a location and a species to view a heatmap of recent
          observations
        </Typography>
        <MapContainer
          key={coordinates}
          className={classes.MapNoInfo}
          center={coordinates}
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
    mapKey = coordinates + speciesSelected.id;
    leafletDisplay = (
      <MapContainer
        key={mapKey}
        className={classes.MapID}
        center={coordinates}
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
    mapKey = coordinates + speciesSelected.id;
    leafletDisplay = (
      <MapContainer
        key={mapKey}
        className={classes.MapID}
        center={coordinates}
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
          key={mapKey}
          className={classes.MapID}
          center={mapKey}
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
    mapKey = coordinates + speciesSelected.id;
    leafletDisplay = (
      <MapContainer
        key={mapKey}
        className={classes.MapID}
        center={coordinates}
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
          key={mapKey}
          className={classes.MapID}
          center={mapKey}
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
