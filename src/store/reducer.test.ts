import reducer, { initialState } from './reducer';
import * as actionTypes from './actions/actionTypes';
import {
  mockSpeciesSelected,
  mockLocationSelected,
} from '../utility/testing/mockData';

describe('reducer tests', () => {
  it('UPDATE_SPECIES_SELECTED should update speciesSelected and set pageNumber to null', () => {
    const newSpeciesSelected = mockSpeciesSelected;
    expect(
      reducer(initialState, {
        type: actionTypes.UPDATE_SPECIES_SELECTED,
        speciesSelected: newSpeciesSelected,
      })
    ).toEqual({
      locationSelected: null,
      speciesSelected: mockSpeciesSelected,
      userCoordinates: null,
      error: null,
      pageNumber: null,
    });
  });

  it('UPDATE_LOCATION_SELECTED should update locationSelected and set pageNumber/userCoordinates to null', () => {
    const newLocationSelected = mockLocationSelected;
    expect(
      reducer(initialState, {
        type: actionTypes.UPDATE_LOCATION_SELECTED,
        locationSelected: newLocationSelected,
      })
    ).toEqual({
      locationSelected: mockLocationSelected,
      speciesSelected: null,
      userCoordinates: null,
      error: null,
      pageNumber: null,
    });
  });

  it('UPDATE_USER_COORDINATES should update userCoordinates and set pageNumber/locationSelected to null', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.UPDATE_USER_COORDINATES,
        userCoordinates: [43.653226, -79.3831843],
      })
    ).toEqual({
      locationSelected: null,
      speciesSelected: null,
      userCoordinates: [43.653226, -79.3831843],
      error: null,
      pageNumber: null,
    });
  });

  it('UPDATE_ERROR should update error and set pageNumber to null', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.UPDATE_ERROR,
        error: '500 Internal Server Error',
      })
    ).toEqual({
      locationSelected: null,
      speciesSelected: null,
      userCoordinates: null,
      error: '500 Internal Server Error',
      pageNumber: null,
    });
  });

  it('UPDATE_PAGE_NUMBER should update pageNumber', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.UPDATE_PAGE_NUMBER,
        pageNumber: 3,
      })
    ).toEqual({
      locationSelected: null,
      speciesSelected: null,
      userCoordinates: null,
      error: null,
      pageNumber: 3,
    });
  });
});
