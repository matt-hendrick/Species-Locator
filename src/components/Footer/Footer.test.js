import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders iNaturalist link', () => {
  render(<Footer />);
  expect(screen.getByText('iNaturalist').closest('a')).toHaveAttribute(
    'href',
    'https://www.inaturalist.org'
  );
});
