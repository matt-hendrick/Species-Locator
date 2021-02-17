import axios from 'axios';
import * as actionTypes from './actionTypes';
import {
  iNaturalistSpeciesAutocompleteResult,
  LocationSelected,
  GoogleMapsAutocompletePrediction,
} from '../../utility/sharedTypes';
import { Dispatch } from 'redux';

export const updateSpeciesSelected = (
  speciesSelected: iNaturalistSpeciesAutocompleteResult
) => {
  return {
    type: actionTypes.UPDATE_SPECIES_SELECTED,
    speciesSelected: speciesSelected,
  };
};

export const updateLocationSelected = (locationSelected: LocationSelected) => {
  return {
    type: actionTypes.UPDATE_LOCATION_SELECTED,
    locationSelected: locationSelected,
  };
};

export const updateUserCoordinates = (userCoordinates: number[]) => {
  return {
    type: actionTypes.UPDATE_USER_COORDINATES,
    userCoordinates: userCoordinates,
  };
};

export const updateError = (error: string) => {
  return {
    type: actionTypes.UPDATE_ERROR,
    error: error,
  };
};

export const updatePageNumber = (pageNumber: number | string) => {
  return {
    type: actionTypes.UPDATE_PAGE_NUMBER,
    pageNumber: pageNumber,
  };
};

export const getCoordinatesFromGeocodeAPI = (
  locationSelected: GoogleMapsAutocompletePrediction
) => {
  return (dispatch: Dispatch) => {
    if (locationSelected) {
      axios
        .get('/Geocode', {
          params: { address: locationSelected },
        })
        .then((data) => {
          dispatch(updateLocationSelected(data.data.results));
        })
        .catch((error) => {
          dispatch(updateError(error.message));
        });
    } else {
      return undefined;
    }
  };
};
