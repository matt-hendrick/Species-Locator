import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

test('Card renders with one photo', () => {
  render(
    <Card
      title="test"
      photos={[
        {
          id: 1,
          url: 'https://www.inaturalist.org/photos/106490382?size=square',
        },
      ]}
      wikipediaURL="https://en.wikipedia.org/wiki/White-headed_pigeon"
      speciesName="White-headed Pigeon"
      observedLocation="Australia"
      spottedByURL="https://www.inaturalist.org/people/3847853"
      spottedBy="John Doe"
      observationURL="https://www.inaturalist.org/observations/66103148"
      observedDateTime="2020/12/05 7:06 AM AEDT"
      locationIsObscured={false}
    />
  );

  expect(screen.getByText(/Spotted by/i)).toBeInTheDocument();
  expect(screen.getByText(/White-headed Pigeon/i).closest('a')).toHaveAttribute(
    'href',
    'https://en.wikipedia.org/wiki/White-headed_pigeon'
  );
  expect(screen.getByText(/John Doe/i).closest('a')).toHaveAttribute(
    'href',
    'https://www.inaturalist.org/people/3847853'
  );
  expect(
    screen.getByText('2020/12/05 7:06 AM AEDT').closest('a')
  ).toHaveAttribute(
    'href',
    'https://www.inaturalist.org/observations/66103148'
  );
});

test('Card renders with two photos', () => {
  render(
    <Card
      title="test"
      photos={[
        {
          url: 'https://www.inaturalist.org/photos/106460587?size=square',
          id: 1,
        },
        {
          url: 'https://www.inaturalist.org/photos/106460595?size=square',
          id: 2,
        },
      ]}
      wikipediaURL="https://en.wikipedia.org/wiki/White-headed_pigeon"
      speciesName="White-headed Pigeon"
      observedLocation="Australia"
      spottedByURL="https://www.inaturalist.org/people/3847853"
      spottedBy="John Doe"
      observationURL="https://www.inaturalist.org/observations/66103148"
      observedDateTime="2020/12/05 7:06 AM AEDT"
      locationIsObscured={false}
    />
  );

  expect(screen.getByText(/Spotted by/i)).toBeInTheDocument();
  expect(screen.getByText(/White-headed Pigeon/i).closest('a')).toHaveAttribute(
    'href',
    'https://en.wikipedia.org/wiki/White-headed_pigeon'
  );
  expect(screen.getByText(/John Doe/i).closest('a')).toHaveAttribute(
    'href',
    'https://www.inaturalist.org/people/3847853'
  );
  expect(
    screen.getByText('2020/12/05 7:06 AM AEDT').closest('a')
  ).toHaveAttribute(
    'href',
    'https://www.inaturalist.org/observations/66103148'
  );
});
