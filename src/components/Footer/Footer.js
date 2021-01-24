import React from 'react';

// MUI
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Footer() {
  return (
    <React.Fragment>
      <Typography variant="caption">
        Data pulled from{' '}
        <Link href="https://www.inaturalist.org"> iNaturalist</Link>
      </Typography>
    </React.Fragment>
  );
}

export default Footer;
