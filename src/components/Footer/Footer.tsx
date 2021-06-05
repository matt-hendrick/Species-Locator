import React, { Fragment } from 'react';

// MUI
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Footer() {
  return (
    <Fragment>
      <Typography variant="caption">
        Data pulled from{' '}
        <Link href="https://www.inaturalist.org"> iNaturalist's</Link>{' '}
        <Link href="https://api.inaturalist.org/v1/docs"> API</Link> - View on{' '}
        <Link href="https://github.com/matt-hendrick/Species-Locator">
          GitHub
        </Link>
      </Typography>
    </Fragment>
  );
}

export default Footer;
