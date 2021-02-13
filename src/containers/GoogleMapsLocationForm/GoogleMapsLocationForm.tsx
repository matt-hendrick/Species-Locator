import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

// Utility Functions
import { googleAnalytics } from '../../utility/utilityFunctions';

// Redux
import { useDispatch } from 'react-redux';
import {
  getCoordinatesFromGeocodeAPI,
  updateError,
} from '../../store/actions/actions';

// MUI
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import AutocompleteForm from '../../components/AutocompleteForm/AutocompleteForm';

interface Option {
  description: string;
}

function GoogleMapsLocationForm() {
  googleAnalytics();

  const [userLocationQuery, setUserLocationQuery] = useState<string | null>(
    null
  );
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
                setOptions(response.map((data: object) => data));
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

  const userLocationQueryChangedHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedLocation = target.value;
      setUserLocationQuery(updatedLocation);
      // clears out options if userLocationQuery has been changed to an empty string
      if (options !== [] && updatedLocation === '') {
        setOptions([]);
      }
    }
  };

  return (
    <AutocompleteForm
      id="GoogleMapsLocationForm"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(option: any, value: any) => {
        dispatch(getCoordinatesFromGeocodeAPI(value));
        setOptions([]);
      }}
      getOptionLabel={(option: Option) => option.description}
      options={options}
      loading={loading}
      loadingText="Search a location"
      textOnChange={(event: any) => userLocationQueryChangedHandler(event)}
      label="Location Selector"
      spinner={
        loading && userLocationQuery ? (
          <CircularProgress color="inherit" size={20} />
        ) : null
      }
    />
  );
}

export default GoogleMapsLocationForm;
