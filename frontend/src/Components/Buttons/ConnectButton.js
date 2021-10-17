import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  redBtn: {
    backgroundColor: "transparent",
    color: "black",
    borderColor: theme.palette.primary.yellow,
 
    "&:hover": {
      backgroundColor: theme.palette.primary.yellow,
    },
  },
}));

export const ConnectBtn = (props) => {
  const classes = useStyles();
  return <Button {...props} className={classes.redBtn} />;
};
