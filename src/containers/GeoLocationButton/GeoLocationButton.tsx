import React, { Fragment } from 'react';

// Utility Functions
import { googleAnalytics } from '../../utility/utilityFunctions';

// Redux
import { useDispatch } from 'react-redux';
import { updateUserCoordinates } from '../../store/actions/actions';

// MUI
import Button from '@material-ui/core/Button';

function GeoLocationButton() {
  googleAnalytics();

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
    <Fragment>
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
    </Fragment>
  );
}

export default GeoLocationButton;
