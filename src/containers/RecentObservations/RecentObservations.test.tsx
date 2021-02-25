import React from 'react';
import {
  render,
  cleanup,
  waitForElementToBeRemoved,
  waitFor,
} from '../../utility/testing/reduxTestUtils';
import RecentObservations from './RecentObservations';
import {
  mockLocationSelected,
  mockSpeciesSelected,
  mockUserCoordinates,
} from '../../utility/testing/mockData';
import { initialState } from '../../store/reducer';

describe('Recent Observations tests', () => {
  afterEach(cleanup);

  it('Renders Recent Observations when passed in blank initialState', async () => {
    const { findAllByRole } = render(<RecentObservations />);
    await findAllByRole('alert');
  });

  it(`Successfully returns observations from iNaturalist API when passed mockSpeciesSelected
  and renders cards with data`, async () => {
    const { findAllByText } = render(<RecentObservations />, {
      initialState: { ...initialState, speciesSelected: mockSpeciesSelected },
    });
    await findAllByText(/spotted by/i), {}, { timeout: 4999 };
  });

  it(`Successfully returns observations from iNaturalist API when passed mockUserCoordinates
  and renders cards with data`, async () => {
    const { findAllByText } = render(<RecentObservations />, {
      initialState: { ...initialState, userCoordinates: mockUserCoordinates },
    });
    await findAllByText(/spotted by/i), {}, { timeout: 4999 };
  });

  it(`Successfully returns observations from iNaturalist API when passed mockLocationSelected
  and renders cards with data`, async () => {
    const { findAllByText } = render(<RecentObservations />, {
      initialState: { ...initialState, locationSelected: mockLocationSelected },
    });

    await findAllByText(/spotted by/i), {}, { timeout: 4999 };
  });
});
