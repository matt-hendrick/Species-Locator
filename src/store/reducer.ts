import * as actionTypes from './actions/actionTypes';
import {
  ReducerState,
  UpdateErrorAction,
  UpdateLocationSelectedAction,
  UpdatePageNumberAction,
  UpdateSpeciesSelectedAction,
  UpdateUserCoordinatesAction,
  Actions,
} from '../utility/sharedTypes';

const initialState: ReducerState = {
  locationSelected: null,
  speciesSelected: null,
  userCoordinates: null,
  error: null,
  pageNumber: null,
};

const updateObject = (oldObject: ReducerState, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const updateSpeciesSelected = (
  state: ReducerState,
  action: UpdateSpeciesSelectedAction
) => {
  const newSpeciesSelected = action.speciesSelected;
  return updateObject(state, {
    speciesSelected: newSpeciesSelected,
    pageNumber: null,
  });
};

const updateLocationSelected = (
  state: ReducerState,
  action: UpdateLocationSelectedAction
) => {
  const newLocationSelected = action.locationSelected;
  return updateObject(state, {
    locationSelected: newLocationSelected,
    userCoordinates: null,
    pageNumber: null,
  });
};

const updateUserCoordinates = (
  state: ReducerState,
  action: UpdateUserCoordinatesAction
) => {
  const newUserCoordinates = action.userCoordinates;
  return updateObject(state, {
    userCoordinates: newUserCoordinates,
    locationSelected: null,
    pageNumber: null,
  });
};

const updateError = (state: ReducerState, action: UpdateErrorAction) => {
  const newError = action.error;
  return updateObject(state, {
    error: newError,
    pageNumber: null,
  });
};

const updatePageNumber = (
  state: ReducerState,
  action: UpdatePageNumberAction
) => {
  const newPageNumber = action.pageNumber;
  return updateObject(state, {
    pageNumber: newPageNumber,
  });
};

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case actionTypes.UPDATE_SPECIES_SELECTED:
      return updateSpeciesSelected(state, action);
    case actionTypes.UPDATE_LOCATION_SELECTED:
      return updateLocationSelected(state, action);
    case actionTypes.UPDATE_USER_COORDINATES:
      return updateUserCoordinates(state, action);
    case actionTypes.UPDATE_ERROR:
      return updateError(state, action);
    case actionTypes.UPDATE_PAGE_NUMBER:
      return updatePageNumber(state, action);
    default:
      return state;
  }
};

export default reducer;
