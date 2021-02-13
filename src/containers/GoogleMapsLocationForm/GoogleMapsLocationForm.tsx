import React, { useState, useEffect, Fragment, ChangeEvent } from 'react';
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';
import {
  getCoordinatesFromGeocodeAPI,
  updateError,
} from '../../store/actions/actions';

// MUI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Option {
  description: string
}

function GoogleMapsLocationForm() {
  if (window.gtag && process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
    window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search,
    });
  }

  const [userLocationQuery, setUserLocationQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;
    let response = null;

    if (!loading) {
      return undefined;
    }

    const requestDataFromAPI = () => {
      if (userLocationQuery && userLocationQuery.length > 2) {
        (async () => {
          axios
            .get('/Maps', {
              params: { address: userLocationQuery },
            })
            .then((data) => {
              response = data.data.predictions;

              if (active && response) {
                setOptions(response.map((data : object) => data));
              }
            })
            .catch((error) => {
              dispatch(updateError(error.message));
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
  }, [loading, userLocationQuery, dispatch]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const userLocationQueryChangedHandler = (event : ChangeEvent) => {
    const target = event.target as HTMLInputElement
    if (target) {
      const updatedLocation = target.value
      setUserLocationQuery(updatedLocation)
      // clears out options if userLocationQuery has been changed to an empty string
      if (options !== [] && updatedLocation === '') {
        setOptions([]);
    }}
  };

  return (
    <Autocomplete
      id="GoogleMapsLocationForm"
      style={{ textAlign: 'center' }}
      clearOnEscape={true}
      filterOptions={(options, state) => options}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(option, value) => {
        dispatch(getCoordinatesFromGeocodeAPI(value));
        setOptions([]);
      }}
      getOptionLabel={(option : Option) => option.description}
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
              <Fragment>
                {loading && userLocationQuery ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default GoogleMapsLocationForm;
