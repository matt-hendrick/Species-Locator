import React from 'react';
import { render, screen } from '../../redux_test-utils';
import SpeciesForm from './SpeciesForm';

test('Renders SpeciesForm with label text "Species Selector"', () => {
  render(<SpeciesForm />);

  expect(screen.getByLabelText(/Species Selector/i)).toBeInTheDocument();
});
