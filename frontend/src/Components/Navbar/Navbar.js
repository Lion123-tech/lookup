import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MobileDrawer } from "./MobileDrawer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/services";
import { openModal } from "../../store/uiSlice";
import EventIcon from "@material-ui/icons/Event";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "white",
    transition: "0.2s ease",
  },
  appBarScroll: {
    backgroundColor: "white",
    boxShadow: "0px 5px 10px -4px #ADADAD",
    transition: "0.2s ease",
  },
  menuButton: {
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "inline-block",
    },
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  logo: {
    marginLeft: "2.5rem",
    [theme.breakpoints.down("md")]: {
      margin: "auto",
    },
  },
  navTitleSelected: {
    fontWeight: "700",
  },
  navTitle: {
    fontWeight: "700",
    color: "#8f8f8f",
  },
  navIconDesktop: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: theme.palette.common.black,
    margin: theme.spacing(0, 2),
  },
  desktopNavigation: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  offset: theme.mixins.toolbar,
}));

export default function ButtonAppBar() {
  // useEffect(() => {
  //   axios.get('http://localhost:5000/protected').then(res => {
  //     console.log('google login ',res.data);
  //   })
  // }, [])
  const dispatch = useDispatch();
  const currentPage = useLocation().pathname;
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userLoggedIn = useSelector((state) => state.auth.loggedIn);
  // Scroll listener to add shadow to navbar on scroll
  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const LabelledNavIcon = ({ name, icon, route }) => (
    <Link to={route} className={classes.navIconDesktop}>
      {/* <IconButton color="inherit" size="small" disableRipple>
        {icon}
      </IconButton> */}
      <Typography
        className={
          currentPage === route ? classes.navTitleSelected : classes.navTitle
        }
      >
        {name}
      </Typography>
    </Link>
  );
  const DesktopIcons = () => {
    let pages;
    if(userLoggedIn) {
       pages = [
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
    }
    else {
       pages = [
        {
          name: "Events",
          icon: <EventIcon />,
          route: "/events",
        }
      ];
    }
    return (
      <div className={classes.desktopNavigation}>
        {pages.map((page) => (
          <LabelledNavIcon key={page.name} {...page} />
        ))}
      </div>
    );
  };
  const LoginButton = () => (
    <Button
      style={{ backgroundColor: "#00b300" }}
      onClick={() => {
        dispatch(openModal("login"));
      }}
    >
      Login
    </Button>
  );

  const LogoutButton = () => (
    <Button style={{ backgroundColor: "#d61900" }} onClick={logout}>
      Logout
    </Button>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={scrolled ? classes.appBarScroll : classes.appBar}
        elevation={0}
      >
        <Toolbar>
          <div className={classes.title}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
              {/* Logo not centered and doesn't have transparent background */}
            </IconButton>
            <img
              className={classes.logo}
              src="/logo_trimmed.png"
              width="120px"
              alt="logo"
            />
          </div>
          <DesktopIcons />
          {userLoggedIn ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>
      {/* position sticky does not seem to work, using an offset mixin
      https://material-ui.com/components/app-bar/#fixed-placement
      */}
      <div className={classes.offset} />
      <MobileDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </div>
  );
}
