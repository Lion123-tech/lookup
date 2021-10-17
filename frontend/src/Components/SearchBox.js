import {
  IconButton,
  InputAdornment,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    borderRadius: "200px",
    height: "2.5rem",
  },
}));

export const SearchBox = ({ value, onChange, placeholder }) => {
  const classes = useStyles();
  return (
    <OutlinedInput
      className={classes.searchBar}
      fullWidth
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};
