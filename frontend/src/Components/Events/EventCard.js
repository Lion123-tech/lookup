import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openEventDrawer } from "../../store/uiSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    MuiPaper: {},
  },
  eventCard: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    transition: "0.2s ease",
    "&:hover": {
      boxShadow: `0px 5px 8px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)`,
      transform: "scale(1.02)",
    },

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(1, 0),
    },
  },
  eventHeaderContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2, 4),
  },
  eventHeader: {
    marginTop: "0",
  },
  eventContent: {
    display: "flex",
    margin: theme.spacing(2, 4),
    flexDirection: "column",
  },
  subHeading: {
    margin: theme.spacing(1, 0),
    fontWeight: "600",
  },
  eventImage: {
    margin: theme.spacing(2, 0),
    marginRight: "auto",
    borderRadius: "8px",
    width: "5rem",
    aspectRatio: "1 / 1"
  },
  eventTitle: {
    width: "80%",
    marginLeft: theme.spacing(2)
  },
  eventInfo: {
    margin: theme.spacing(1, 0)
  },
  button: {
    margin: "auto 0 0 0",
  },
}));

export const EventCard = ({
  eventId,
  from,
  to,
  eventIndex,
  venue,
  _id,
  headerColor,
  name,
  participants
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.auth.loggedIn);
  const userid = useSelector((state) => state.auth.userInfo._id);

  const [participateBtn, setparticipateBtn] = useState("participate")

  useEffect(() => {
    // console.log("event id", _id);
    console.log("event dcard", participants);
    console.log("event userid", userid);
    if(participants.includes(userid)) {
      setparticipateBtn("participated")
    }

    
  }, [])

  const participateHandler = async () => {
    const api = await fetch("http://localhost:5000/event/addParticipants", {
      method: "PUT",
      credentials: "include",
      headers: {
        'Authorization': localStorage.getItem("jwt"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventid: _id })
    })
    const res = await api.json()
    console.log("participate request page...", res);
    setparticipateBtn("participated")

  }

  return (
    <Grid container item md={4} justifyContent="center">
      <Paper className={classes.eventCard} elevation={3}>
        <div className={classes.eventHeader} style={{ backgroundColor: headerColor }}>
          <div className={classes.eventHeaderContent}>
            <img alt="event" className={classes.eventImage} src="https://source.unsplash.com/random" />
            <Typography
              component="span"
              color="textPrimary"
              className={classes.eventTitle}
            >
              {name}
            </Typography>
          </div>
        </div>
        <div className={classes.eventContent}>
          <Grid container>
            <Grid item xs={4}>
              <Typography color="textSecondary" className={classes.subHeading}>
                Venue:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.eventInfo}>
                {venue}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography color="textSecondary" className={classes.subHeading}>
                From:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.eventInfo}>
                {from}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography color="textSecondary" className={classes.subHeading}>
                To:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.eventInfo}>
                {to}
              </Typography>
            </Grid>
          </Grid>
          <Button variant="text" color="primary" className={classes.button}
            onClick={() => { dispatch(openEventDrawer(eventIndex)) }}
          >
            View more details
          </Button>
          {
            userLoggedIn ? participateBtn=="participate"? <Button onClick={()=> participateHandler() } variant="text" color="secondary" className={classes.button}>
              Participate
            </Button> : <Button disabled  variant="text" color="secondary" className={classes.button}>
              Participated
            </Button> :
              <Button variant="text" disabled color="secondary" className={classes.button}>
                Login to Participate
              </Button>
          }
        </div>
      </Paper>
    </Grid>
  );
};
