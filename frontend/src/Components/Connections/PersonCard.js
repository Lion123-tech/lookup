import {
  Avatar,
  Button,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ConnectBtn } from "../Buttons/ConnectButton";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BtnContainer from "./BtnContainer";
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "20rem",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1, 0),
    },
  },
  personName: {
    fontWeight: "bold",
    textAlign: "center",
    overflow: "hidden",
    width: "90%",
    textOverflow: "ellipsis",
  },
  personDesc: {
    textOverflow: "ellipsis",
    textAlign: "center",
    overflow: "hidden",
    width: "90%",
    marginTop: "0",
    height: "2  .5rem",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderColor: theme.palette.primary.yellow,
    borderWidth: "thick",
    borderRadius:"50%",
    // borderSpacing:"50px",
  },
  nameLink: {
    color: 'black',
  },
}));


export const PersonCard = ({ name, school, studentId, pic }) => {
  const classes = useStyles();
  const [btnname, setbtnname] = useState("connect")
  const userData = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userData.requestsent && userData.requestsent.includes(studentId)) {
      console.log("yessss request sent");
      setbtnname("request sent")
    }
    else if(userData.pendings && userData.pendings.includes(studentId)){
      console.log("yessss pendings");
      setbtnname("accept request")
    }
    else if(userData.connections && userData.connections.includes(studentId)){
      console.log("yessss connections");
      setbtnname("connection")
    }
  }, [userData])

  const handleconnectbtn = async () => {
    console.log("handle btn",studentId );
    const api = await fetch("http://localhost:5000/user/follow", {
      method: "PUT",
      credentials: "include",
      headers: {
        'Authorization': localStorage.getItem("jwt"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ followId: studentId })
    })
    const res = await api.json()
    console.log("folllow request page...", res);
    setbtnname("request sent")
  }

  const handleacceptrequestbtn = async () => {
    console.log("handle btn",studentId );
    const api = await fetch("http://localhost:5000/user/acceptRequest", {
      method: "PUT",
      credentials: "include",
      headers: {
        'Authorization': localStorage.getItem("jwt"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ followId: studentId })
    })
    const res = await api.json()
    console.log("accept request page...", res);
    setbtnname("connection")
  }

  return (
    <Paper variant="outlined" className={classes.cardContainer}>
      <Link to={`/profile/${studentId}`} className={classes.nameLink}>
        <CardMedia className={classes.large} style={{ borderWidth: 'medium', borderStyle: 'solid' }} image={pic}></CardMedia>
      </Link>
      <Typography variant="h6" className={classes.personName}>
        <Link to={`/profile/${studentId}`} className={classes.nameLink}>
          {name}
        </Link>
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.personDesc}
      >
        {school ? school : "data not provided"}
      </Typography>
     <BtnContainer btnname={btnname} handleconnectbtn={handleconnectbtn} handleacceptrequestbtn={handleacceptrequestbtn} />
     {/* <ConnectBtn
      variant="outlined" color="primary" onClick={() => handlebtn()}>
    
      {btnname}
    </ConnectBtn> */}

    </Paper>
  );
};
