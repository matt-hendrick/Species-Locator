import React, { Fragment } from 'react';

// React Leaflet
import { MapContainer, TileLayer } from 'react-leaflet';

// MUI
import Typography from '@material-ui/core/Typography';

// Types
import { iNaturalistSpeciesAutocompleteResult } from '../../utility/sharedTypes';
import { LatLngExpression } from 'leaflet';

interface Props {
  speciesSelected?: iNaturalistSpeciesAutocompleteResult;
  mapKey: string | number | null | undefined;
  center: LatLngExpression | undefined;
  className: string;
  zoom: number;
}

function LeatfletMap(props: Props) {
  return (
    <Fragment>
      {!props.speciesSelected && (
        <Typography
          variant="h6"
          component="h6"
          color="primary"
          className="text-align-center"
        >
          Select a location and a species to view a heatmap of recent
          observations
        </Typography>
      )}
      <MapContainer
        key={props.mapKey}
        className={props.className}
        center={props.center}
        zoom={props.zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.speciesSelected && (
          <TileLayer
            attribution='<a href="https://www.inaturalist.org/">iNaturalist</a>'
            url={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?color=blue&quality_grade=research&taxon_id=${props.speciesSelected.id}`}
          />
        )}
      </MapContainer>
    </Fragment>
  );
}

export default LeatfletMap;
