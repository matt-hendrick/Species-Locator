import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import userEvent from '@testing-library/user-event';
import Tabs from './Tabs';

describe('Tabs tests', () => {
  it('On init, renders Tabs with label text for "Recent Observations" and "Heatmap"', () => {
    render(<Tabs />);
    expect(
      screen.getByText(/loading recent observations from inaturalist.../i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/recent observations/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/heatmap/i)).toBeInTheDocument();
  });

  it('Renders "Heatmap" tab when heapmap label clicked', async () => {
    render(<Tabs />);
    expect(screen.getByLabelText(/recent observations/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/heatmap/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('tab', { name: /heatmap/i }));
    await screen.findByText(
      /Select a location and a species to view a heatmap of recent observation/i
    );
  });
});
