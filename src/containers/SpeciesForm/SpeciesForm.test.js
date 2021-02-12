import React from 'react';
import { render, screen } from '../../utility/testing/reduxTestUtils';
import SpeciesForm from './SpeciesForm';

describe('SpeciesForm tests', () => {
  it('On init, renders SpeciesForm with label text "Species Selector"', () => {
    render(<SpeciesForm />);

    expect(screen.getByLabelText(/Species Selector/i)).toBeInTheDocument();
  });
});
