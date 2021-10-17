import { Grid, LinearProgress, makeStyles } from "@material-ui/core";
import { OtherUserInfoSection, UserInfoSection } from "./OtherUserInfoSection";
import { OtherProfileDetails, ProfileDetails } from "./OtherProfileDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

const LoadingView = () => (
  <Grid container justifyContent="center">
    <div style={{ width: "80%", margin: "2rem" }}>
      <LinearProgress />
    </div>
  </Grid>
);

const OtherUserCreation = () => {
  const classes = useStyles(); 
  const param = useParams();
  const [userData, setuserData] = useState({})
  const [loading, setLoading] = useState(true);

const id = param.id
const fetchuser = async () => {
  const api = await fetch(`http://localhost:5000/user/getuserbyid/${id}`, { method: "GET" })
  const res = await api.json()
  setuserData(res)
  setLoading(false)

}

useEffect(() => {

  fetchuser()
  // console.log("use effect of other porfile page",id);
}, [])

  return (
    loading ? (
      <LoadingView />
    ) : 
    <Grid
      container
      justifyContent={"space-around"}
      className={classes.container}
    >
      <Grid item container xs={12} md={4} justifyContent="center">
        <OtherUserInfoSection userData={userData} />
      </Grid>
      <Grid item xs={12} md={8} className={classes.detailsContainer}>
        <OtherProfileDetails  userDetails={userData} />
      </Grid>
    </Grid>
  );
};

export default OtherUserCreation;
