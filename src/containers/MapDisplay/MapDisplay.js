import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import * as classes from './MapDisplay.module.css';
import { connect } from 'react-redux';

function MapDisplay(props) {
  const { locationSelected, speciesSelected, userCoordinates } = props;

  let leafletDisplay = null;
  let mapKey = null;
  let coordinates = ['40.7812', '-73.9665'];

  if (!locationSelected && !speciesSelected && !userCoordinates) {
    leafletDisplay = (
      <MapContainer
        key={coordinates}
        className={classes.MapID}
        center={coordinates}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  } else if (speciesSelected && !locationSelected && !userCoordinates) {
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
    );
  }

  return <React.Fragment>{leafletDisplay}</React.Fragment>;
}

const mapStateToProps = (state) => {
  return {
    locationSelected: state.locationSelected,
    speciesSelected: state.speciesSelected,
    userCoordinates: state.userCoordinates,
  };
};

export default connect(mapStateToProps)(MapDisplay);
