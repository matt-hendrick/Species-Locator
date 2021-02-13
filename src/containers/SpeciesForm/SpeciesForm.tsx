import React, { useState, useEffect, Fragment, ChangeEvent } from 'react';
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';
import {
  updateSpeciesSelected,
  updateError,
} from '../../store/actions/actions';

// MUI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Option {
  preferred_common_name: string,
  name: string
}

function SpeciesForm() {
  if (window.gtag && process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
    window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search,
    });
  }

  const [userSpeciesQuery, setUserSpeciesQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const dispatch = useDispatch();

  useEffect(() => {
    let response = null;
    if (!loading) {
      return undefined;
    }

    const requestDataFromAPI = () => {
      if (userSpeciesQuery && userSpeciesQuery.length > 2) {
        axios
          .get(
            'https://api.inaturalist.org/v1/taxa/autocomplete?q=' +
              userSpeciesQuery
          )
          .then((data) => {
            response = data;
            if (response?.data.results) {
              setOptions(response.data.results.map((data: object) => data));
            }
          })
          .catch((error) => {
            dispatch(updateError(error.message));
          });
      }
    };

    // debouncing so API called only if user has stopped typing for one second
    const timeoutId = setTimeout(() => requestDataFromAPI(), 1000);
    return () => clearTimeout(timeoutId);
  }, [loading, userSpeciesQuery, dispatch]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const userSpeciesQueryChangedHandler = (event : ChangeEvent) => {
    const target = event.target as HTMLInputElement
    if (target) {
    const updatedSpecies = target.value;
    setUserSpeciesQuery(updatedSpecies);
    // clears out options if userSpeciesQuery has been changed to an empty string
    if (options !== [] && updatedSpecies === '') {
      setOptions([]);}
    }
  };

  return (
    <Autocomplete
      id="SpeciesForm"
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
      onChange={(option, value) => dispatch(updateSpeciesSelected(value))}
      // added ternary expression below as some species do not have a "preferred common name"
      getOptionLabel={(option : Option) =>
        option.preferred_common_name
          ? option.preferred_common_name
          : option.name
      }
      options={options}
      loading={loading}
      loadingText="Search a species"
      noOptionsText="No results found. Try clearing the text and re-searching."
      renderInput={(params) => (
        <TextField
          {...params}
          label="Species Selector"
          variant="outlined"
          margin="normal"
          onChange={(event) => userSpeciesQueryChangedHandler(event)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading && userSpeciesQuery ? (
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

export default SpeciesForm;
