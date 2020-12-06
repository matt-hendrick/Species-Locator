import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/index';

import Card from '../../components/Card/Card';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';

function RecentObservations(props) {
  const [observationData, setObservationData] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const {
    locationSelected,
    speciesSelected,
    userCoordinates,
    onUpdateError,
  } = props;

  useEffect(() => {
    setIsLoading(true);
    if (!speciesSelected && !locationSelected && !userCoordinates) {
      axios
        .get('https://api.inaturalist.org/v1/observations', {
          params: {
            // taxon_id #1 is "Animals". If the taxon_id param is removed, will display all recently observed species
            taxon_id: 1,
            quality_grade: 'research',
            order_by: 'observed_on',
            photos: true,
            per_page: 28,
            page: pageNumber,
          },
        })
        .then((response) => {
          setObservationData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          onUpdateError(error.message);
        });
    } else if (speciesSelected && !locationSelected & !userCoordinates) {
      axios
        .get('https://api.inaturalist.org/v1/observations', {
          params: {
            taxon_id: speciesSelected.id,
            quality_grade: 'research',
            order_by: 'observed_on',
            photos: true,
            per_page: 28,
            page: pageNumber,
          },
        })
        .then((response) => {
          setObservationData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          onUpdateError(error.message);
        });
    } else if (!speciesSelected && locationSelected && locationSelected[0]) {
      axios
        .get('https://api.inaturalist.org/v1/observations', {
          params: {
            // taxon_id #1 is "Animals". If the taxon_id param is removed, will display all recently observed species
            taxon_id: 1,
            lat: locationSelected[0].geometry.location.lat,
            lng: locationSelected[0].geometry.location.lng,
            radius: 50,
            quality_grade: 'research',
            order_by: 'observed_on',
            photos: true,
            per_page: 28,
            page: pageNumber,
          },
        })
        .then((response) => {
          setObservationData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          onUpdateError(error.message);
        });
    } else if (speciesSelected && locationSelected && locationSelected[0]) {
      axios
        .get('https://api.inaturalist.org/v1/observations', {
          params: {
            taxon_id: speciesSelected.id,
            lat: locationSelected[0].geometry.location.lat,
            lng: locationSelected[0].geometry.location.lng,
            radius: 50,
            quality_grade: 'research',
            order_by: 'observed_on',
            photos: true,
            per_page: 28,
            page: pageNumber,
          },
        })
        .then((response) => {
          setObservationData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          onUpdateError(error.message);
        });
    } else if (!speciesSelected && userCoordinates) {
      axios
        .get('https://api.inaturalist.org/v1/observations', {
          params: {
            // taxon_id #1 is "Animals". If the taxon_id param is removed, will display all recently observed species
            taxon_id: 1,
            lat: userCoordinates[0],
            lng: userCoordinates[1],
            radius: 50,
            quality_grade: 'research',
            order_by: 'observed_on',
            photos: true,
            per_page: 28,
            page: pageNumber,
          },
        })
        .then((response) => {
          setObservationData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          onUpdateError(error.message);
        });
    } else if (speciesSelected && userCoordinates) {
      axios
        .get('https://api.inaturalist.org/v1/observations', {
          params: {
            taxon_id: speciesSelected.id,
            lat: userCoordinates[0],
            lng: userCoordinates[1],
            radius: 50,
            quality_grade: 'research',
            order_by: 'observed_on',
            photos: true,
            per_page: 28,
            page: pageNumber,
          },
        })
        .then((response) => {
          setObservationData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          onUpdateError(error.message);
        });
    }
  }, [
    speciesSelected,
    locationSelected,
    userCoordinates,
    onUpdateError,
    pageNumber,
  ]);

  // iNaturalist species names are sometimes lowercase so title case function is needed
  const toTitleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  };

  const handlePageNumberChange = (event, value) => {
    setPageNumber(value);
  };

  let display = (
    <React.Fragment>
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} />
      </Container>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '16px',
        }}
      >
        <Typography variant="body1">
          Loading recent observations from iNaturalist...
        </Typography>
      </Container>
    </React.Fragment>
  );

  if (observationData && !isLoading) {
    display = (
      <Grid container spacing={2}>
        {observationData.data.results.map((data) => {
          // nameOfSpecies variable created as some observations initially do not have the correct name
          let nameOfSpecies = data.identifications[0].taxon
            .preferred_common_name
            ? toTitleCase(data.identifications[0].taxon.preferred_common_name)
            : toTitleCase(data.identifications[0].taxon.name);
          // checks to see if a second user provided a name. If so, replaces nameOfSpecies with that name
          if (data.identifications.slice(-1)[0].taxon.preferred_common_name) {
            nameOfSpecies = toTitleCase(
              data.identifications.slice(-1)[0].taxon.preferred_common_name
            );
          }

          // wikipediaLink variable created as some observations initially do not have the correct wikipedia link
          let wikipediaLink = data.identifications[0].taxon.wikipedia_url;
          // checks to see if a second user provided a link. If so, replaces wikipediaLink with that link
          if (data.identifications[1]?.taxon.wikipedia_url) {
            wikipediaLink = data.identifications[1].taxon.wikipedia_url;
          }

          // creates dateDisplay variable to standardize date/time
          let dateDisplay = new Date(data.observed_on_string).toString();
          // checks to see if datetime errored with "Invalid Date" string. If error, dateDisplay set to raw observed_on_string
          if (dateDisplay.toString() === 'Invalid Date') {
            dateDisplay = data.observed_on_string;
          }

          return (
            <Grid item xs={12} sm={6} md={3} key={data.id}>
              <Card
                speciesName={nameOfSpecies}
                wikipediaURL={wikipediaLink}
                photos={data.photos}
                observedDateTime={dateDisplay}
                observationURL={`https://www.inaturalist.org/observations/${data.id}`}
                observedLocation={data.place_guess}
                locationIsObscured={data.obscured}
                coordinates={data.location}
                title={data.species_guess}
                spottedBy={data.user.name ? data.user.name : data.user.login}
                spottedByURL={`https://www.inaturalist.org/people/${data.user.id}`}
              ></Card>
            </Grid>
          );
        })}
      </Grid>
    );

    if (!observationData.data.results[0]) {
      if (locationSelected) {
        display = (
          <Typography gutterBottom variant="h4" component="h4">
            No recent observations
            {speciesSelected
              ? ` of ${
                  speciesSelected.preferred_common_name
                    ? speciesSelected.preferred_common_name
                    : speciesSelected.name
                }`
              : null}{' '}
            found within 50 kilometers of{' '}
            {locationSelected[0]?.formatted_address}.
          </Typography>
        );
      } else if (userCoordinates) {
        display = (
          <Typography gutterBottom variant="h4" component="h4">
            No recent observations{' '}
            {speciesSelected
              ? ` of ${
                  speciesSelected.preferred_common_name
                    ? speciesSelected.preferred_common_name
                    : speciesSelected.name
                }`
              : null}{' '}
            found within 50 kilometers of your location ({userCoordinates[0]},{' '}
            {userCoordinates[1]}).
          </Typography>
        );
      }
    }
  }

  return (
    <React.Fragment>
      <Container>
        {display}
        {observationData?.data.results[0] &&
        !isLoading &&
        observationData?.data.total_results / 28 > 1 ? (
          <Pagination
            // checks if total number of pages exceeds 100, max number of pages set to 100
            count={
              observationData?.data.total_results / 28 > 100
                ? 100
                : Math.round(observationData?.data.total_results / 28)
            }
            color="primary"
            onChange={handlePageNumberChange}
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px',
            }}
            page={pageNumber}
          />
        ) : null}
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    locationSelected: state.locationSelected,
    speciesSelected: state.speciesSelected,
    userCoordinates: state.userCoordinates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateError: (error) => dispatch(actions.updateError(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentObservations);
