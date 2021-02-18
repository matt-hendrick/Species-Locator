import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import GoogleMapsLocationForm from './GoogleMapsLocationForm';
import userEvent from '@testing-library/user-event';

describe('GoogleMapsLocationForm tests', () => {
  it('Renders GoogleMapsLocationForm with label text "Location Selector"', () => {
    render(<GoogleMapsLocationForm />);

    expect(screen.getByLabelText(/Location Selector/i)).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/Location Selector/i), 'Toronto');
    expect(screen.getByLabelText(/Location Selector/i)).toHaveValue('Toronto');

    expect(screen.getByText(/Search a location/i)).toBeInTheDocument();
  });
});
