import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import MapDisplay from '../MapDisplay/MapDisplay';
import RecentObservations from '../RecentObservations/RecentObservations';

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

function SimpleTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

export default SimpleTabs;
