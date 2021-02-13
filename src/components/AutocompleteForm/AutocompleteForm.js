import React, { Fragment } from 'react';

// MUI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function AutocompleteForm(props) {
  return (
    <Autocomplete
      id={props.id}
      style={{ textAlign: 'center' }}
      clearOnEscape={true}
      filterOptions={(options, state) => options}
      open={props.open}
      onOpen={props.onOpen}
      onClose={props.onClose}
      onChange={props.onChange}
      // added ternary expression below as some species do not have a "preferred common name"
      getOptionLabel={props.getOptionLabel}
      options={props.options}
      loading={props.loading}
      loadingText={props.loadingText}
      noOptionsText="No results found. Try clearing the text and re-searching."
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant="outlined"
          margin="normal"
          onChange={props.textOnChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {props.spinner}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default AutocompleteForm;
