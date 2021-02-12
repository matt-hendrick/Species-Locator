import React, { Fragment } from 'react';
import axios from 'axios';
import './App.css';

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

  declare global {
    interface Window {
      gtag?: (
        key: string,
        trackingId: string,
        config: { page_path: string }
      ) => void
    }
  }

function App() {
  if (window.gtag && process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
    window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search,
    });
  }
  return (
    <Fragment>
      <ThemeProvider>
        <Navbar />
        <Container className="App">
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
    </Fragment>
  );
}

export default App;
