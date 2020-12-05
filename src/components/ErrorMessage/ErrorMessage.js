import React from 'react';
import Typography from '@material-ui/core/Typography';

function ErrorMessage(props) {
  return (
    <React.Fragment>
      <Typography gutterBottom variant="h4" component="h4">
        Something went wrong. {props.children}.
      </Typography>
    </React.Fragment>
  );
}

export default ErrorMessage;
