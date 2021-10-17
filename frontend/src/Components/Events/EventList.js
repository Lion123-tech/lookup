import { Grid, Typography } from "@material-ui/core";
import { EventCard } from "./EventCard";
// using randomly generated data for now

export const EventList = ({ filteredEvents }) => {
  const headerColors = ["#FAFAF1", "#F1F6FA", "#FAF1F1"]
  return (
    <Grid item container spacing={8}>
      {Object.keys(filteredEvents).length !== 0 ? (
        Object.keys(filteredEvents).map((eventID, index) => (
          <EventCard {...filteredEvents[index]} key={eventID} eventIndex={index}
          headerColor={headerColors[index % 3]}
          />
        ))
      ) : (
        <Grid container justifyContent="center">
          <Typography>No events match your query</Typography>
        </Grid>
      )}
    </Grid>
  );
};
