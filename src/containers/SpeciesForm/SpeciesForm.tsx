import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

// Utility Functions
import { googleAnalytics } from '../../utility/utilityFunctions';

// Redux
import { useDispatch } from 'react-redux';
import {
  updateSpeciesSelected,
  updateError,
} from '../../store/actions/actions';

// MUI
import CircularProgress from '@material-ui/core/CircularProgress';

import AutocompleteForm from '../../components/AutocompleteForm/AutocompleteForm';

// Types
import { SpeciesSelected } from '../../utility/sharedTypes';

function SpeciesForm() {
  googleAnalytics();

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

  const userSpeciesQueryChangedHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedSpecies = target.value;
      setUserSpeciesQuery(updatedSpecies);
      // clears out options if userSpeciesQuery has been changed to an empty string
      if (options !== [] && updatedSpecies === '') {
        setOptions([]);
      }
    }
  };

  return (
    <AutocompleteForm
      id="SpeciesLocatorForm"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      speciesOnChange={(option: any, value: SpeciesSelected | null) =>
        dispatch(updateSpeciesSelected(value))
      }
      getOptionLabel={(option: SpeciesSelected) =>
        // added ternary expression below as some species do not have a "preferred common name"
        option.preferred_common_name
          ? option.preferred_common_name
          : option.name
      }
      options={options}
      loading={loading}
      loadingText="Search a species"
      textOnChange={(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => userSpeciesQueryChangedHandler(event)}
      label="Species Selector"
      spinner={
        loading && userSpeciesQuery ? (
          <CircularProgress color="inherit" size={20} />
        ) : null
      }
    />
  );
}

export default SpeciesForm;
