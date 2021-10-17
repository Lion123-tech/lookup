import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  redBtn: {
    backgroundColor: "#D61900",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#D61900",
    },
  },
}));

export const RedBtn = (props) => {
  const classes = useStyles();
  return <Button {...props} className={classes.redBtn} />;
};
