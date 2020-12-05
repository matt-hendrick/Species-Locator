import React, { useState } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import MapDisplay from '../MapDisplay/MapDisplay';
import RecentObservations from '../RecentObservations/RecentObservations';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SimpleTabs(props) {
  const [value, setValue] = useState(0);

  const { error } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  } else {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Recent Observations" {...a11yProps(0)} />
            <Tab label="Heatmap" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <RecentObservations />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MapDisplay />
        </TabPanel>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};

export default connect(mapStateToProps)(SimpleTabs);
