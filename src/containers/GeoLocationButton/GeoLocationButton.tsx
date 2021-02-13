import React, { Fragment } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { updateUserCoordinates } from '../../store/actions/actions';

// MUI
import Button from '@material-ui/core/Button';

function GeoLocationButton() {
  // Google Analytics
  if (window.gtag && process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
    window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search,
    });
  }

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
