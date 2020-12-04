import axios from 'axios';
import * as actionTypes from './actionTypes';

export const updateSpeciesSelected = (speciesSelected) => {
  return {
    type: actionTypes.UPDATE_SPECIES_SELECTED,
    speciesSelected: speciesSelected,
  };
};

export const updateLocationSelected = (locationSelected) => {
  return {
    type: actionTypes.UPDATE_LOCATION_SELECTED,
    locationSelected: locationSelected,
  };
};

export const updateUserCoordinates = (userCoordinates) => {
  return {
    type: actionTypes.UPDATE_USER_COORDINATES,
    userCoordinates: userCoordinates,
  };
};

export const getCoordinatesFromGeocodeAPI = (locationSelected) => {
  return (dispatch) => {
    if (locationSelected) {
      axios
        .get('/Geocode', {
          params: { address: locationSelected },
        })
        .then((data) => {
          dispatch(updateLocationSelected(data.data.results));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return undefined;
    }
  };
};
