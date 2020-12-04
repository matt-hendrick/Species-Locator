import React from 'react';
import { render, screen } from '../../redux_test-utils';
import RecentObservations from './RecentObservations';

test('Renders Recent Observations with initial loading text ', () => {
  render(<RecentObservations />);

  expect(
    screen.getByText(/Loading recent observations from iNaturalist.../i)
  ).toBeInTheDocument();
});
