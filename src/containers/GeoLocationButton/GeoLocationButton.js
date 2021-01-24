import React from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { updateUserCoordinates } from '../../store/actions/actions';

// MUI
import Button from '@material-ui/core/Button';

function GeoLocationButton() {
  const dispatch = useDispatch();

  const getUserGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        updateUserCoordinates([
          position.coords.latitude,
          position.coords.longitude,
        ])
      );
    });
  };

  return (
    <React.Fragment>
      {navigator.geolocation ? (
        <Button
          onClick={getUserGeolocation}
          variant="contained"
          color="primary"
          fullWidth
        >
          Use My Location
        </Button>
      ) : null}
    </React.Fragment>
  );
}

export default GeoLocationButton;
