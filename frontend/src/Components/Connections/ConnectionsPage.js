import {
  Container,
  Grid,
  Typography,
  Divider,
  Avatar,
  Paper,
  CircularProgress
} from "@material-ui/core";
import { CardMedia } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import { ConnectionList } from "./ConnectionList";
import { ConnectionsInfo } from "./ConnectionsInfo";
import { SearchBox } from "../SearchBox";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  eventContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      // margin: 0,
    },
  },
  wave: {
    background: "url(/wave.svg) no-repeat bottom",
    // background: "url(/abstract.jpg) no-repeat ",
    // backgroundAttachment: "fixed",
    // backgroundSize: "500px 500px",
    backgroundAttachment: 'fixed',
    minHeight: "100vh",
    marginTop: "auto"
  },
  container: {
    marginTop: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderColor: theme.palette.primary.yellow,
    margin:"0 auto",
    borderRadius:"50%",

  },
  centerPane: {
    width: "100%",
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(1, 0),
      borderRadius: "0",
    },
  },
  leftPane: {
    width: "100%",
    margin: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(1, 0),
    },
  },
  leftPaneContent: {    
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(3),

    [theme.breakpoints.down("md")]: {
      borderRadius: "0",
    },
  },
  centerHeader: {
    display: "flex",
  },
  centerTitle: {
    flexGrow: "1",
  },
  nameLink: {
    fontWeight: "bold",
  },
}));

const ConnectionsPage = () => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState({});
  const [allevents, setAllEvents] = useState({})
  const theme = useTheme();
  const history = useHistory();
  const userLoggedIn = useSelector((state) => state.auth.loggedIn);
  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);
    // const regexp = new RegExp(e.target.value, "i");
    // const newEvents = allevents.filter((x) => regexp.test(x.username));
    console.log("coinnections filter serach", searchInput);
    // setFilteredEvents(newEvents);
  };

  useEffect(() => {
   if(!userLoggedIn) {
    history.push('/')
   }
  }, [])

  return (
    <div className={classes.wave}>
      <Container className={classes.eventContainer}>

        <Grid container spacing={2}>
          <Grid item container xs={12} md={6}>
            <SearchBox
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search for events..."
            />
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>People to connect with</Typography>

          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item container xs={12} md={3}>
            <div className={classes.leftPane}>
              <Paper className={classes.leftPaneContent}>
                  <CardMedia className={classes.large}  style={{ borderWidth: 'medium', borderStyle: 'solid', marginBottom:theme.spacing(3) }} image="https://picsum.photos/200"></CardMedia>
                <ConnectionsInfo />
              </Paper>
            </div>
          </Grid>
          {/* right part */}
          <Grid item xs={12} md={8} className={classes.centerPane}>
            <ConnectionList searchInput={searchInput}/>
          </Grid>
        </Grid>

      </Container>


    </div>

  );
};

export default ConnectionsPage;
