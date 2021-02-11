import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import RecentObservations from './RecentObservations';

describe('Recent Observations tests', () => {
  it('Renders Recent Observations when passed in blank initialState', () => {
    const { getByRole } = render(
      <RecentObservations />,

      {
        initialState: {},
      }
    );
    // screen.debug();
    // const listItems = await screen.findAllByRole('listitem');
    // expect(listItems).toHaveLength(9);
    expect(
      screen.getByText(/Loading recent observations from iNaturalist.../i)
    ).toBeInTheDocument();
  });
});
