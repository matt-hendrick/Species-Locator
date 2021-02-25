import React, { useState, useEffect, Fragment, ChangeEvent } from 'react';
import axios from 'axios';

// Utility Functions
import { toTitleCase, googleAnalytics } from '../../utility/utilityFunctions';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updatePageNumber, updateError } from '../../store/actions/actions';

// MUI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

// Components
import Card from '../../components/Card/Card';
import CardSkeleton from '../../components/CardSkeleton/CardSkeleton';

// Types
import { StateProps, ObservationResult } from '../../utility/sharedTypes';

interface Params {
  taxon_id: number;
  quality_grade: string;
  order_by: string;
  photos: boolean;
  per_page: number;
  page: number;
  lat?: number;
  lng?: number;
  radius?: number;
}

interface Data {
  results: ObservationResult[];
  total_results: number;
  page: number;
  per_page: number;
}
[];

interface ObservationData {
  data: Data;
}

function RecentObservations() {
  googleAnalytics();

  const [
    observationData,
    setObservationData,
  ] = useState<null | ObservationData>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const locationSelected = useSelector(
    (state: StateProps) => state.locationSelected
  );
  const speciesSelected = useSelector(
    (state: StateProps) => state.speciesSelected
  );
  const userCoordinates = useSelector(
    (state: StateProps) => state.userCoordinates
  );
  const pageNumber = useSelector((state: StateProps) => state.pageNumber);

  const getData = (params: Params) => {
    axios
      .get('https://api.inaturalist.org/v1/observations', {
        params: params,
      })
      .then((response: ObservationData) => {
        setObservationData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        dispatch(updateError(error.message));
      });
  };

  useEffect(() => {
    // taxon_id #1 is "Animals". If the taxon_id param is removed, will display all recently observed species (including fungi and plants)
    let params: Params = {
      taxon_id: 1,
      quality_grade: 'research',
      order_by: 'observed_on',
      photos: true,
      per_page: 16,
      page: pageNumber,
    };
    setIsLoading(true);
    if (!speciesSelected && !locationSelected && !userCoordinates) {
      getData(params);
    } else if (speciesSelected && !locationSelected && !userCoordinates) {
      params = { ...params, taxon_id: speciesSelected.id };
      getData(params);
    } else if (!speciesSelected && locationSelected && locationSelected[0]) {
      params = {
        ...params,
        lat: locationSelected[0].geometry.location.lat,
        lng: locationSelected[0].geometry.location.lng,
        radius: 50,
      };
      getData(params);
    } else if (speciesSelected && locationSelected && locationSelected[0]) {
      params = {
        ...params,
        taxon_id: speciesSelected.id,
        lat: locationSelected[0].geometry.location.lat,
        lng: locationSelected[0].geometry.location.lng,
        radius: 50,
      };
      getData(params);
    } else if (!speciesSelected && userCoordinates) {
      params = {
        ...params,
        lat: userCoordinates[0],
        lng: userCoordinates[1],
        radius: 50,
      };
      getData(params);
    } else if (speciesSelected && userCoordinates) {
      params = {
        ...params,
        taxon_id: speciesSelected.id,
        lat: userCoordinates[0],
        lng: userCoordinates[1],
        radius: 50,
      };
      getData(params);
    }
    return () => {
      setIsLoading(false);
    };
  }, [
    speciesSelected,
    locationSelected,
    userCoordinates,
    pageNumber,
    dispatch,
  ]);

  const handlePageNumberChange = (
    event: ChangeEvent<unknown>,
    value: number | string
  ) => {
    dispatch(updatePageNumber(value));
  };

  let display = (
    // init/loading state displays 16 CardSkeletons
    <Grid container spacing={2}>
      {[...Array(16)].map((x, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={index}
          role="alert"
          aria-busy="true"
        >
          <CardSkeleton />
        </Grid>
      ))}
    </Grid>
  );

  if (observationData && !isLoading) {
    display = (
      <Grid container spacing={2}>
        {observationData.data.results.map((data) => {
          // nameOfSpecies variable created as some observations initially do not have the correct name (users don't always know the name of the species that they've seen)
          let nameOfSpecies = data.identifications[0].taxon
            .preferred_common_name
            ? // iNaturalist species names are sometimes lowercase so a title case function is needed to ensure uniformity
              toTitleCase(data.identifications[0].taxon.preferred_common_name)
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
    <Fragment>
      <Container>
        {display}
        {observationData?.data.results[0] &&
        !isLoading &&
        observationData?.data.total_results / 16 > 1 ? (
          <Pagination
            // if total number of pages exceeds 100, max number of pages set to 100
            count={
              observationData?.data.total_results / 16 > 100
                ? 100
                : Math.round(observationData?.data.total_results / 16)
            }
            color="primary"
            onChange={handlePageNumberChange}
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px',
            }}
            // if pageNumber is null, sets page to 1. Ensures that page 1 is correctly highlighted on initial search
            page={pageNumber ? pageNumber : 1}
          />
        ) : null}
      </Container>
    </Fragment>
  );
}

export default RecentObservations;
