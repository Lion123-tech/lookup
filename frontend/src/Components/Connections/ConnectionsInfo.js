import React from 'react';
import { List, ListItem, Typography } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`wrapped-tabpanel-${index}`}
    aria-labelledby={`wrapped-tab-${index}`}
    {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  tab: {
    padding: '2px 34px',
    width: '140px',
    height: '72px',
    color: '#4b4b4b'
},
indicator: {
  backgroundColor: '#DBFD04',
},
}));

export const ConnectionsInfo = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const styles = {
    tab: {
      fontWeight: "bold",
        color: 'black'
    },
    tabItemContainer: {
        background: 'none'
    }
}
  return (
    <>
      <AppBar position="static" color="white" elevation={0}>
        <Tabs value={value} onChange={handleChange}
        variant="fullWidth" 
        variant="scrollable"
   
        classes={{
          indicator: classes.indicator
        }}
        
        scrollButtons="auto"
        aria-label="simple tabs example">
          <Tab label="My connections" {...a11yProps(0)}   style={styles.tab}/>
          <Tab label="Request Sent" {...a11yProps(1)}   style={styles.tab}/>
          <Tab label="Item Three" {...a11yProps(2)}   style={styles.tab}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ display: "flex", width: "100%" }}>
          <Typography variant="body1" style={{ flexGrow: "1" }}>
            Connections
          </Typography>
          <Typography variant="body1" color="textSecondary">
            50
          </Typography>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ display: "flex", width: "100%" }}>
          <Typography variant="body1" style={{ flexGrow: "1" }}>
            Pending
          </Typography>
          <Typography variant="body1" color="textSecondary">
            43
          </Typography>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </>
    // <List>
    //   <ListItem button>
    //     <div style={{ display: "flex", width: "100%" }}>
    //       <Typography variant="body1" style={{ flexGrow: "1" }}>
    //         Connections
    //       </Typography>
    //       <Typography variant="body1" color="textSecondary">
    //         50
    //       </Typography>
    //     </div>
    //   </ListItem>
    //   <ListItem button>
    //     <div style={{ display: "flex", width: "100%" }}>
    //       <Typography variant="body1" style={{ flexGrow: "1" }}>
    //         Pending
    //       </Typography>
    //       <Typography variant="body1" color="textSecondary">
    //         43
    //       </Typography>
    //     </div>
    //   </ListItem>
    // </List>
  );
};
