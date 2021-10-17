import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import pages from "./Pages";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    height: "100vh",
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  navItem: {
    margin: theme.spacing(2),
  },
}));

export const MobileDrawer = ({ open, onClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleNavItemClick = (route) => {
    history.push(route);
    onClose();
  };

  const NavItem = ({ route, icon, name }) => (
    <Paper className={classes.navItem}>
      <ListItem
        button
        onClick={() => {
          handleNavItemClick(route);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant="h5">{name}</Typography>}
        />
      </ListItem>
    </Paper>
  );
  return (
    <Drawer open={open} onClose={onClose} anchor="bottom">
      <div className={classes.drawerContainer}>
        <List className={classes.navList} component="nav">
          {pages.map((page) => (
            <NavItem key={page.name} {...page} />
          ))}
          <div style={{ flexGrow: "0.8" }}></div>
          <ListItem
            onClick={() => {
              onClose();
            }}
          >
            <ListItemText
              primaryTypographyProps={{ align: "center" }}
              primary={
                <IconButton>
                  <CloseIcon />
                </IconButton>
              }
            />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
