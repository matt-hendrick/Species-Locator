import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function CardSkeleton() {
  return (
    <React.Fragment>
      <Skeleton variant="rect" width={250} height={250} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="text" width={250} />
      <Skeleton variant="text" width={250} />
      <Skeleton variant="text" width={250} />
    </React.Fragment>
  );
}

export default CardSkeleton;
