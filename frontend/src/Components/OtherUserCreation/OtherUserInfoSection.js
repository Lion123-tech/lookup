import { Typography, makeStyles, Avatar, IconButton, Grid, LinearProgress } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/uiSlice";

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    objectFit: "contain",
    width: "100%",
    aspectRatio: "1 / 1",
    height: "auto",
    margin: "0",
    borderRadius: "inherit",
    // max
  },
  profileContainer: {
    width: "380px",
    maxWidth: "100%",
    display: "flex",
    alignSelf: "flex-start",
    maxHeight: "800px",
    overflow: "hidden",
    // margin: theme.spacing(2, 0),
    flexDirection: "column",
    backgroundColor: "#B9D40E",
    borderRadius: "32px",
  },
  profileSection: {
    borderRadius: "inherit",
    backgroundColor: "#EAFF00",
    // padding: theme.spacing(2),
  },
  about: {
    padding: theme.spacing(2),
    textOverflow: "ellipsis",
  },
  // profilePic: {
  //   height: "8rem",
  //   width: "8rem",
  //   marginLeft: "1rem",
  //   marginTop: "-5rem",
  // },
  description: {},
  userHeader: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },

  userInfo: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "60%",
    },
  },
  schoolInfo: {
    minWidth: "30%",
  },
}));

const LoadingView = () => (
  <Grid container justifyContent="center">
    <div style={{ width: "80%", margin: "2rem" }}>
      <LinearProgress />
    </div>
  </Grid>
);


export const OtherUserInfoSection = ({ userData }) => {
  const classes = useStyles();

  // const fetchuser = async () => {
  //   const api = await fetch(`http://localhost:5000/user/getuserbyid/${id}`, { method: "GET" })
  //   const res = await api.json()
  //   setuserData(res)
  //   setLoading(false)

  // }

  // useEffect(() => {

  //   fetchuser()
  //   // console.log("use effect of other porfile page",id);
  // }, [])

  return (

   <div className={classes.profileContainer}>
      <div className={classes.profileSection}>
        <Avatar
          variant="square"
          src={userData.pic}
          className={classes.bannerImage}
          alt="banner"
        ></Avatar>

        <div className={classes.userHeader}>
          <div className={classes.userInfo}>
            <Typography
              variant={"h6"}
              style={{ fontWeight: "bold", display: "block" }}
            >
              {userData.username}
            </Typography>
            <Typography variant="body1">Studying in <b>Class {userData.education.grade}</b></Typography>
            {/* <Typography variant="body1">{userData.education.address}</Typography> */}
          </div>
          <div>
            {/* <Typography
                variant="body1"
                color="textPrimary"
                className={classes.schoolInfo}
              >
                {userData.education.school}
              </Typography> */}
            <Typography
              variant="body2"
              color="textPrimary"
              className={classes.connectionCounter}
            >
              Connections <b>216</b>
            </Typography>
     
          </div>
        </div>
      </div>
      <div className={classes.about}>
        <Typography
          variant={"h6"}
          style={{ fontWeight: "bold", display: "block" }}
        >
          About Me
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {userData.about}
        </Typography>
      </div>
    </div>

  );
};
