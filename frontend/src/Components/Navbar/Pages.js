import React from 'react'
import EventIcon from "@material-ui/icons/Event";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";

function Pages() {
const userLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <div>
      
    </div>
  )
}
const pages = [
  {
    name: "Events",
    icon: <EventIcon />,
    route: "/events",
  },
  {
    name: "Connections",
    icon: <GroupAddIcon />,
    route: "/connections",
  },
  {
    name: "Profile",
    icon: <AccountCircleIcon />,
    route: "/myprofile",
  },
];

export default pages;






