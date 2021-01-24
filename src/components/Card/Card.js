import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

function MaterialUICard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {props.photos.length === 1 ? (
        <CardMedia
          className={classes.media}
          image={props.photos[0].url.replace('square', 'medium')}
          title={props.title}
        />
      ) : (
        <Carousel autoPlay={false}>
          {props.photos.map((data) => {
            return (
              <CardMedia
                key={data.id}
                className={classes.media}
                image={data.url.replace('square', 'medium')}
                title={props.title}
              />
            );
          })}
        </Carousel>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          {props.wikipediaURL ? (
            <Link href={props.wikipediaURL}>{props.speciesName}</Link>
          ) : (
            props.speciesName
          )}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {props.observedLocation}{' '}
          {/* <Typography variant="caption" color="textSecondary" component="p">
            {props.locationIsObscured ? props.coordinates : null}
          </Typography> */}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          Spotted by <Link href={props.spottedByURL}>{props.spottedBy}</Link> at{' '}
          <Link href={props.observationURL}>{props.observedDateTime}</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MaterialUICard;
