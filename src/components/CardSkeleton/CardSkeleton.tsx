import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function CardSkeleton() {
  return (
    <React.Fragment>
      <Skeleton variant="rect" height={250} />
      <div style={{ width: '75%' }}>
        <Skeleton variant="text" />
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </React.Fragment>
  );
}

export default CardSkeleton;
