import * as actionTypes from './actions/actionTypes';

const initialState = {
  locationSelected: null,
  speciesSelected: null,
  userCoordinates: null,
  error: null,
};

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const updateSpeciesSelected = (state, action) => {
  const newSpeciesSelected = action.speciesSelected;
  return updateObject(state, {
    speciesSelected: newSpeciesSelected,
  });
};

const updateLocationSelected = (state, action) => {
  const newLocationSelected = action.locationSelected;
  return updateObject(state, {
    locationSelected: newLocationSelected,
    userCoordinates: null,
  });
};

const updateUserCoordinates = (state, action) => {
  const newUserCoordinates = action.userCoordinates;
  return updateObject(state, {
    userCoordinates: newUserCoordinates,
    locationSelected: null,
  });
};

const updateError = (state, action) => {
  const newError = action.error;
  return updateObject(state, {
    error: newError,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SPECIES_SELECTED:
      return updateSpeciesSelected(state, action);
    case actionTypes.UPDATE_LOCATION_SELECTED:
      return updateLocationSelected(state, action);
    case actionTypes.UPDATE_USER_COORDINATES:
      return updateUserCoordinates(state, action);
    case actionTypes.UPDATE_ERROR:
      return updateError(state, action);
    default:
      return state;
  }
};

export default reducer;
