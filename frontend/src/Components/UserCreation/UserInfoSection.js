import { Typography, makeStyles, Avatar, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
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

export const UserInfoSection = () => {
  // Will implement log in status fetching from backend, defaulting to true for testing
  const userLoggedIn = true;
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userInfo);
  return (
    <>
      <div className={classes.profileContainer}>
        <div className={classes.profileSection}>
          <Avatar
            variant="square"
            src={userData.pic}
            className={classes.bannerImage}
            alt="banner"
          ></Avatar>
          {/* <Avatar
        className={classes.profilePic}
        src="https://source.unsplash.com/random"
        alt="profile"
      >
        Image
      </Avatar> */}
          <div className={classes.userHeader}>
            <div className={classes.userInfo}>
              <Typography
                variant={"h6"}
                style={{ fontWeight: "bold", display: "block" }}
              >
                {userData.name}
              </Typography>
              <Typography variant="body1">Studying in <b>Class {userData.education.grade}</b></Typography>
              <Typography variant="body1">{userData.education.address}</Typography>
            </div>
            <div>
              {/* <Skeleton variant="circle" width="30px" height="30px" /> */}
              <Typography
                variant="body1"
                color="textPrimary"
                className={classes.schoolInfo}
              >
                {userData.education.school}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                className={classes.connectionCounter}
              >
                Connections <b>216</b>
              </Typography>
              {userLoggedIn && (
                <IconButton
                  style={{ float: "right" }}
                  onClick={() => {
                    dispatch(openModal("profile"));
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
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
    </>
  );
};
