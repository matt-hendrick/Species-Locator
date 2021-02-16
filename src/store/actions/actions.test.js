import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  updateSpeciesSelected,
  updateLocationSelected,
  updateUserCoordinates,
  updateError,
  updatePageNumber,
} from './actions';
import {
  mockSpeciesSelected,
  mockLocationSelected,
} from '../../utility/testing/mockData';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions tests', () => {
  it('updateSpeciesSelected should dispatch an "UPDATE_SPECIES_SELECTED" action and update speciesSelected with mock data', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(updateSpeciesSelected(mockSpeciesSelected));

    const actions = store.getActions();
    const expectedPayload = {
      type: 'UPDATE_SPECIES_SELECTED',
      speciesSelected: mockSpeciesSelected,
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('updateLocationSelected should dispatch an "UPDATE_LOCATION_SELECTED" action and update locationSelected with mock data', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(updateLocationSelected(mockLocationSelected));

    const actions = store.getActions();
    const expectedPayload = {
      type: 'UPDATE_LOCATION_SELECTED',
      locationSelected: mockLocationSelected,
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('updateUserCoordinates should dispatch an "UPDATE_USER_COORDINATES" action and update userCoordinates with mock data', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(updateUserCoordinates([43.653226, -79.3831843]));

    const actions = store.getActions();
    const expectedPayload = {
      type: 'UPDATE_USER_COORDINATES',
      userCoordinates: [43.653226, -79.3831843],
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('updateError should dispatch an "UPDATE_ERROR" action and update error with mock data', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(updateError('500 Internal Server Error'));

    const actions = store.getActions();
    const expectedPayload = {
      type: 'UPDATE_ERROR',
      error: '500 Internal Server Error',
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('updatePageNumber should dispatch an "UPDATE_PAGE_NUMBER" action and update pageNumber with mock data', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(updatePageNumber(2));

    const actions = store.getActions();
    const expectedPayload = {
      type: 'UPDATE_PAGE_NUMBER',
      pageNumber: 2,
    };
    expect(actions).toEqual([expectedPayload]);
  });
});
