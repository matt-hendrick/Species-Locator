import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import RecentObservations from './RecentObservations';

describe('Recent Observations tests', () => {
  it('Renders Recent Observations when passed in blank initialState', () => {
    render(<RecentObservations />);
    expect(
      screen.getByText(/Loading recent observations from iNaturalist.../i)
    ).toBeInTheDocument();
  });
});
