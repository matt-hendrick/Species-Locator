import React from 'react';
import { render, screen } from '../../redux_test-utils';
import Tabs from './Tabs';

test('Renders Tabs with label text for "Recent Observations" and "Heatmap"', () => {
  render(<Tabs />);

  expect(screen.getByLabelText(/Recent Observations/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Heatmap/i)).toBeInTheDocument();
});
