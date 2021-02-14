import React, { Fragment } from 'react';

// MUI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Types
import { SpeciesSelected } from '../../store/reduxTypes';

interface Props {
  id: string;
  open: boolean;
  onOpen: (event: React.ChangeEvent<{}>) => void;
  onClose: (event: React.ChangeEvent<{}>) => void;
  speciesOnChange?: (
    event: React.ChangeEvent<{}>,
    value: SpeciesSelected | null
  ) => void;
  locationOnChange?: (
    event: React.ChangeEvent<{}>,
    value: object | null
  ) => void;
  getOptionLabel: (option: never) => string;
  options: never[];
  loading: boolean;
  loadingText: string;
  textOnChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  spinner: JSX.Element | null;
}

function AutocompleteForm(props: Props) {
  return (
    <Autocomplete
      id={props.id}
      style={{ textAlign: 'center' }}
      clearOnEscape={true}
      filterOptions={(options, state) => options}
      open={props.open}
      onOpen={props.onOpen}
      onClose={props.onClose}
      onChange={props.speciesOnChange || props.locationOnChange}
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
