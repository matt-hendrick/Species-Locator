import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

function SpeciesForm(props) {
  const [userSpeciesQuery, setUserSpeciesQuery] = useState(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const { onUpdateSpeciesSelected, onUpdateError } = props;

  useEffect(() => {
    let response = null;
    if (!loading) {
      return undefined;
    }

    const requestDataFromAPI = () => {
      if (userSpeciesQuery?.length > 2) {
        axios
          .get(
            'https://api.inaturalist.org/v1/taxa/autocomplete?q=' +
              userSpeciesQuery
          )
          .then((data) => {
            response = data;
            if (response?.data.results) {
              setOptions(response.data.results.map((data) => data));
            }
          })
          .catch((error) => {
            onUpdateError(error.message);
          });
      }
    };

    // debouncing so API called only if user has stopped typing for one second
    const timeoutId = setTimeout(() => requestDataFromAPI(), 1000);
    return () => clearTimeout(timeoutId);
  }, [loading, userSpeciesQuery, onUpdateError]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const userSpeciesQueryChangedHandler = (event) => {
    const updatedSpecies = event.target.value;
    setUserSpeciesQuery(updatedSpecies);
  };

  const filterOptions = createFilterOptions({
    trim: true,
  });

  return (
    <Autocomplete
      id="SpeciesForm"
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
      onChange={(option, value) => onUpdateSpeciesSelected(value)}
      // added ternary expression below as some species do not have a "preferred common name"
      getOptionLabel={(option) =>
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
              <React.Fragment>
                {loading && userSpeciesQuery ? (
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
    onUpdateSpeciesSelected: (speciesSelected) =>
      dispatch(actions.updateSpeciesSelected(speciesSelected)),
    onUpdateError: (error) => dispatch(actions.updateError(error)),
  };
};

export default connect(null, mapDispatchToProps)(SpeciesForm);
