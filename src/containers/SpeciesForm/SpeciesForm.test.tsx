import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import SpeciesForm from './SpeciesForm';
import userEvent from '@testing-library/user-event';

describe('SpeciesForm tests', () => {
  it(`Renders SpeciesForm with entered value when valid text entered. 
  Also displays dropdown "search a species" text after input`, () => {
    render(<SpeciesForm />);

    expect(screen.getByLabelText(/Species Selector/i)).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/Species Selector/i), 'Bear');
    expect(screen.getByLabelText(/Species Selector/i)).toHaveValue('Bear');

    expect(screen.getByText(/Search a species/i)).toBeInTheDocument();
  });
});
