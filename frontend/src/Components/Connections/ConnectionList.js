import {
  Grid,
  Divider,
  makeStyles,
  Avatar,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { PersonCard } from "./PersonCard";
import { useCallback, useEffect, useState } from "react";
import { SearchBox } from "../SearchBox";
import { peopleURL } from "../../config";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  connectionContainer: {
    // padding: theme.spacing(1),
    // "& > *": {
    //   marginTop: theme.spacing(2),
    // },
  }
}));

const LoadingView = () => (
  <Grid container justifyContent="center">
    <div style={{ width: "80%", margin: "2rem" }}>
      <LinearProgress />
    </div>
  </Grid>
);

export const ConnectionList = ({ searchInput }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchfilteredUsers, setsearchFilteredUsers] = useState([]);
  const [fetchuser, setfetchuser] = useState([]);
  const userData = useSelector((state) => state.auth.userInfo);

  const fetchConnections = async () => {
    const api = await fetch("http://localhost:5000/user/getalluser", { method: "GET" })
    const res = await api.json()
    setLoading(false)
    setfetchuser(res)
  }

  const filterConnections = () => {
    const filteredPeople = fetchuser.filter((item) => item._id !== userData._id);
    setFilteredUsers(() => {
      return filteredPeople
    })
    const regexp = new RegExp(searchInput, "i");
    const newEvents = filteredPeople.filter((x) => regexp.test(x.username));
    setsearchFilteredUsers(newEvents)
  }

  useEffect(() => {
    fetchConnections()
  }, [fetchuser]);
  
  useEffect(() => {
    filterConnections()
  }, [fetchuser,searchInput]);
  
  return (
    <div className={classes.connectionContainer}>
      <Grid container spacing={2} className={classes.connectionList}>
        {loading ? (
          <LoadingView />
        ) : filteredUsers && !searchfilteredUsers?
        filteredUsers.map((user) => (
          <Grid key={user._id} item xs={6} md={3}>
            <PersonCard
              name={user.username}
              school={user.education.school}
              studentId={user._id}
              pic={user.pic}

            />
          </Grid>
        ))
      :
        searchfilteredUsers.length === 0 ? (
          <Typography>No matches founds</Typography>
        ) : (
          searchfilteredUsers.map((user) => (
            <Grid key={user._id} item xs={6} md={3}>
              <PersonCard
                name={user.username}
                school={user.education.school}
                studentId={user._id}
                pic={user.pic}

              />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};
