import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

function GoogleMapsLocationForm(props) {
  const [userLocationQuery, setUserLocationQuery] = useState(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const { onGetCoordinatesFromGeocodeAPI } = props;

  useEffect(() => {
    let active = true;
    let response = null;

    if (!loading) {
      return undefined;
    }

    const requestDataFromAPI = () => {
      if (userLocationQuery?.length > 2) {
        (async () => {
          axios
            .get('/Maps', {
              params: { address: userLocationQuery },
            })
            .then((data) => {
              response = data.data.predictions;

              if (active && response) {
                setOptions(response.map((data) => data));
              }
            });
        })();

        return () => {
          active = false;
        };
      }
    };

    // debouncing so API called only if user has stopped typing for one second
    const timeoutId = setTimeout(() => requestDataFromAPI(), 1000);
    return () => clearTimeout(timeoutId);
  }, [loading, userLocationQuery]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const userLocationQueryChangedHandler = (event) => {
    const updatedSpecies = event.target.value;
    setUserLocationQuery(updatedSpecies);
  };

  const filterOptions = createFilterOptions({
    trim: true,
  });

  return (
    <Autocomplete
      id="GoogleMapsLocationForm"
      style={{ textAlign: 'center' }}
      clearOnEscape={true}
      filterOptions={filterOptions}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(option, value) => onGetCoordinatesFromGeocodeAPI(value)}
      getOptionLabel={(option) => option.description}
      options={options}
      loading={loading}
      loadingText="Search a location"
      noOptionsText="No results found. Try clearing the text and re-searching."
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location Selector"
          variant="outlined"
          margin="normal"
          onChange={(event) => userLocationQueryChangedHandler(event)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && userLocationQuery ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCoordinatesFromGeocodeAPI: (locationSelected) =>
      dispatch(actions.getCoordinatesFromGeocodeAPI(locationSelected)),
  };
};

export default connect(null, mapDispatchToProps)(GoogleMapsLocationForm);
