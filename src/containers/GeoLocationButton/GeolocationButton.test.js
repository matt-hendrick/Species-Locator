import React from 'react';
import { render, screen, create } from '../../utility/testing/reduxTestUtils';
import GeoLocationButton from './GeoLocationButton';

describe('Recent Observations tests', () => {
  it('Renders GeoLocationButton with the text "Use My Location"', () => {
    navigator.geolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn(),
    };

    render(<GeoLocationButton />);

    expect(screen.getByText(/Use My Location/i)).toBeInTheDocument();
  });
});
// test('props.onClick is called when button is clicked', () => {
//   navigator.geolocation = {
//     getCurrentPosition: jest.fn(),
//     watchPosition: jest.fn(),
//   };
//   const mockOnClick = jest.fn();
//   const { getByText } = render(<GeoLocationButton onClick={mockOnClick} />);
//   // Simulate button click
//   const button = getByText('Use My Location');
//   fireEvent.click(button);

//   // Verify callback is invoked

//   expect(mockOnClick).toHaveBeenCalled();
// });
