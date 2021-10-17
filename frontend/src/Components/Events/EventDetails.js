import { Divider, Drawer, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { closeEventDrawer } from "../../store/uiSlice";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const useStyles = makeStyles((theme) => ({
    detailHeader: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    detailContainer: {
        width: "30vw",
        [theme.breakpoints.down('md')]: {
            width: "100vw"
        }
    },
    eventImage: {
        borderRadius: "8px",
        width: "5rem",
        aspectRatio: "1 / 1",
        margin: theme.spacing(1)
      },
      eventTitle: {
          fontWeight: "700"
      },
      eventBody: {
        margin: theme.spacing(2)
      },
      dateHeader: {
          display: "flex",
          margin: theme.spacing(1)
      },
      startDate: {
          alignSelf: "flex-start",
          flexGrow: "1"
      },
      endDate: {
          alignSelf: "flex-end",
      }
}))

export const EventDetails = ({name, _id, participantGroupings, prizes, to, from, venue, eventImage, structures}) => {
    const dispatch = useDispatch()
    const drawerOpen = useSelector(state => state.ui.eventDrawer.drawerOpen)
    const classes = useStyles()
    console.log(participantGroupings)
    return (
        <Drawer anchor="right" open={drawerOpen} 
        onClose={() => {dispatch(closeEventDrawer())}}
        >
      <Grid className={classes.detailContainer}>
          <Grid item xs={12}>
          <IconButton disableRipple onClick={() => {dispatch(closeEventDrawer())}}>
              <CancelRoundedIcon/>
          </IconButton>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
              <div className={classes.detailHeader}>
                <img src={eventImage} className={classes.eventImage}/>
                <Typography align="center" variant="h6" className={classes.eventTitle}>{name}</Typography>
                <Typography align="center" variant="h6" color="textSecondary" className={classes.eventTitle}>Venue: {venue}</Typography>
              </div>
            </Grid>
              <div className={classes.dateHeader}>
                <Typography className={classes.startDate}>From: {from}</Typography>
                <Typography className={classes.endDate}>To: {to}</Typography>
              </div>
              <Divider/>
              <div className={classes.eventBody}>
                  { participantGroupings &&
                    <div>
                        <Typography variant="h5">Participant Grouping</Typography>
                        <ul>
                            {participantGroupings.map((content) => (
                                <li><Typography>{content}</Typography></li>
                            ))}
                        </ul>
                    </div>

                  }
                  { prizes &&
                    <div>
                        <Typography variant="h5">Prizes</Typography>
                        <ul>
                            {prizes.map((content) => (
                                <li><Typography>{content}</Typography></li>
                            ))}
                        </ul>
                    </div>

                  }
                  { structures &&
                    structures.map((structure) => (
                    <div>
                        <Typography variant="h5">{structure.name}</Typography>
                        <ul>
                            {structure.points.map((content) => (
                                <li><Typography>{content}</Typography></li>
                            ))}
                        </ul>
                    </div>

                    ))

                  }
                <Typography variant="body1">
                    {/* {eventBody} */}
                </Typography>
              </div>
          </Grid>
    </Drawer>
    )
}