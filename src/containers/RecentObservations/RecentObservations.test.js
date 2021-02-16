import React from 'react';
import { render } from '../../utility/testing/reduxTestUtils';
import RecentObservations from './RecentObservations';
import { mockLocationSelected } from '../../utility/testing/mockData';

describe('Recent Observations tests', () => {
  it('Renders Recent Observations when passed in blank initialState', () => {
    const { getByText } = render(<RecentObservations />);
    expect(
      getByText(/Loading recent observations from iNaturalist.../i)
    ).toBeInTheDocument();
  });

  it(`Successefully returns observations from iNaturalist API when passed mockLocationData 
  and renders cards with data`, async () => {
    const { findAllByText } = render(<RecentObservations />, {
      initialState: { locationSelected: mockLocationSelected },
    });
    await findAllByText(/spotted by/i);
  });
});
