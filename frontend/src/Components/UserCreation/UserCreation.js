import { Grid, makeStyles } from "@material-ui/core";
import { UserInfoSection } from "./UserInfoSection";
import { ProfileDetails } from "./ProfileDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      margin: 0,
    },
  },
  detailsContainer: {
    padding: theme.spacing(2, 4, 0, 2),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  },
  subContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  container: {
    margin: theme.spacing(2, 0),
  },
}));

const UserCreationPage = () => {
  const classes = useStyles(); 
  const history = useHistory();
  const userLoggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    if(!userLoggedIn) {
     history.push('/')
    }
   }, [])
  // const fetchuser = async() => {
  //   const api = await fetch(`http://localhost:5000/user/getuserbyid/${id}`, {method: "GET"})
  //   const res = await api.json()
  //   console.log("profile page...", res);
  //   setdata(res)
  // } 

  // useEffect(() => {
  // setid(param.id)
  // fetchuser()

  // }, [])

  return (
    <Grid
      container
      justifyContent={"space-around"}
      className={classes.container}
    >
      <Grid item container xs={12} md={4} justifyContent="center">
        <UserInfoSection />
      </Grid>
      <Grid item xs={12} md={8} className={classes.detailsContainer}>
        <ProfileDetails />
      </Grid>
    </Grid>
  );
};

export default UserCreationPage;
