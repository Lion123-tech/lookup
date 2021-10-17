import {
  Container,
  Grid,
  Typography,
  Divider,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SearchBox } from "../SearchBox";
import { EventDetails } from "./EventDetails";
import { EventList } from "./EventList";
import mockEvents from "./mockEvents";

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
    minHeight: "100vh",  
    marginTop: "auto"
  }
}));

const EventContainer = () => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState({});
  const [allevents, setAllEvents] = useState({})
  const [loading, setLoading] = useState(true)
  const [aborterr, setaborterr] = useState(false)

  const eventID = useSelector(state => state.ui.eventDrawer.eventID)

  async function fetchWithTimeout(resource, options = {}) {
    const { timeout } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
  
    return response;
  }

  const fetchEvents = async() => {
    try {
      const response = await fetchWithTimeout('http://localhost:5000/event/allevent', {
        timeout: 6000
      });
      const res = await response.json();
      setLoading(false)
      setAllEvents(res)
      setFilteredEvents(res)
    } catch (error) {
      // Timeouts if the request takes
      // longer than 6 seconds
      setaborterr(true)
      
      if(error.name === 'AbortError') {
        setaborterr(true)
      }
      console.log("error from event container",error.name === 'AbortError');
    }
    // const api = await fetch("http://localhost:5000/event/allevent", {method: "GET"})
    // const res = await api.json()
  }
  useEffect(() => {
    // Get events from api here
    fetchEvents()
  }, [])

  useEffect(() => {
    console.log("abort error",aborterr);

  }, [aborterr])
  
  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);
    const regexp = new RegExp(e.target.value, "i");
    const newEvents = allevents.filter((x) => regexp.test(x.name));
    setFilteredEvents(newEvents);
  };

  return (
    <div className={classes.wave}>
    <Container  className={classes.eventContainer}>
        <Grid container spacing={2}>
          <Grid item container xs={12} md={6}>
          <SearchBox
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search for events..."
            />
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="h5" style={{fontWeight: "bold"}}>Upcoming events</Typography>
            
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          { loading ? aborterr ? <h2>taking too long to respond</h2> :
            <CircularProgress/>
            :
            <EventList {...{ filteredEvents }} />
          }
        </Grid>
    </Container>
    <EventDetails  {...allevents[eventID]} eventImage="https://source.unsplash.com/random"/>
    </div>
  );
};

export default EventContainer;
