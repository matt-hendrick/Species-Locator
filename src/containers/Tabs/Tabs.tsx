import React, { useState, Fragment, ReactNode, ChangeEvent } from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

// Components
import MapDisplay from '../MapDisplay/MapDisplay';
import RecentObservations from '../RecentObservations/RecentObservations';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// Utility Functions
import { googleAnalytics } from '../../utility/utilityFunctions';

interface Props {
  children: ReactNode;
  value: number;
  index: number;
}

interface StateProps {
  error: string;
}

function TabPanel(props: Props) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SimpleTabs() {
  googleAnalytics();

  const [value, setValue] = useState(0);

  const error = useSelector((state: StateProps) => state.error);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  } else {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default SimpleTabs;
