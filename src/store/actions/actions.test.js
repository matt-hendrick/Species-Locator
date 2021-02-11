import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { updateSpeciesSelected, updateLocationSelected } from './actions';
import {
  mockSpeciesSelectedData,
  mockLocationSelectedData,
} from '../../utility/testing/MockData';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions tests', () => {
  it('updateSpeciesSelected should dispatch a "update species selection" action and update speciesSelected with mock data', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(updateSpeciesSelected(mockSpeciesSelectedData));

    const actions = store.getActions();
    const expectedPayload = {
      type: 'UPDATE_SPECIES_SELECTED',
      speciesSelected: mockSpeciesSelectedData,
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('updateLocationSelected should dispatch a update location selection action and update locationSelected with mock data', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(updateLocationSelected(mocklocationSelectedData));

    const actions = store.getActions();
    const expectedPayload = {
      type: 'UPDATE_LOCATION_SELECTED',
      locationSelected: mockLocationSelectedData,
    };
    expect(actions).toEqual([expectedPayload]);
  });
});
