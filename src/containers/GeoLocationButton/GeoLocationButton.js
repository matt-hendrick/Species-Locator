import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

function GeoLocationButton(props) {
  const { onUpdateUserCoordinates } = props;

  const getUserGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      onUpdateUserCoordinates([
        position.coords.latitude,
        position.coords.longitude,
      ]);
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

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserCoordinates: (userCoordinates) =>
      dispatch(actions.updateUserCoordinates(userCoordinates)),
  };
};

export default connect(null, mapDispatchToProps)(GeoLocationButton);
