import React from 'react';
import axios from 'axios';
import * as classes from './App.module.css';

// MUI
import Container from '@material-ui/core/Container';

import Navbar from './components/Navbar/Navbar';
import SpeciesForm from './containers/SpeciesForm/SpeciesForm';
import GoogleMapsLocationForm from './containers/GoogleMapsLocationForm/GoogleMapsLocationForm';
import Tabs from './containers/Tabs/Tabs';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import Footer from './components/Footer/Footer';
import GeoLocationButton from './containers/GeoLocationButton/GeoLocationButton';

axios.defaults.baseURL =
  'https://us-central1-specieslocator.cloudfunctions.net/app';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <Navbar />
        <Container className={classes.App}>
          <Container>
            <SpeciesForm />
            <GoogleMapsLocationForm />
            <Container style={{ width: '16em', paddingBottom: '16px' }}>
              <GeoLocationButton />
            </Container>
          </Container>
          <Tabs />
        </Container>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '32px',
          }}
        >
          <Footer />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
