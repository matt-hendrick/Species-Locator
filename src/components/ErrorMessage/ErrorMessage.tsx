import React, { Fragment } from 'react';

// MUI
import Typography from '@material-ui/core/Typography';

interface Props {
  children: string;
}

function ErrorMessage(props: Props) {
  return (
    <Fragment>
      <Typography gutterBottom variant="h4" component="h4">
        Something went wrong. {props.children}.
      </Typography>
    </Fragment>
  );
}

export default ErrorMessage;
