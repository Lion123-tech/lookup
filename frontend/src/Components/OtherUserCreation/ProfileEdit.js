import { Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../store/userProfileSlice";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  editContainer: {
    padding: theme.spacing(2),
  },
  miscData: {
    width: "100%",
  }
}));

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userInfo);
  const initialState = {
    username: userData.username,
    about: userData.about,
    school: userData.education.school,
    address: userData.education.address,
    grade: userData.education.grade,
    previouspercentage: userData.education.previouspercentage,
  }
  const [newUserData, setNewUserData] = useState(initialState);
  const handleChange = (e) => {
    setNewUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  };

  const saveAndClose = () => {
    dispatch(updateUserData({
      username: newUserData.username,
      school: newUserData.school,
      grade: newUserData.grade,
      address: newUserData.address,
      about: newUserData.about,
      previouspercentage: newUserData.previouspercentage
    }));
  };
  const classes = useStyles();

  const grades = ["V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]

  return (
    <Grid container spacing={2} className={classes.editContainer}>
      <Grid item container xs={12} md={6}>
        <TextField
          variant={"outlined"}
          label="Name"
          name="username"
          required
          value={newUserData.username}
          onChange={handleChange}
          fullWidth
        ></TextField>
      </Grid>
      <Grid item container xs={12} md={6}>
        <TextField
          onChange={handleChange}
          variant={"outlined"}
          name="school"
          label="School"
          required
          value={newUserData.school}
          fullWidth
        ></TextField>
      </Grid>
        <Grid item container xs={6}>
          <FormControl
          variant="outlined"
          className={classes.miscData}>
        <InputLabel id="demo-simple-select-outlined-label">Grade</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            name="grade"
            label="Grade"
            value={newUserData.grade}
            onChange={handleChange}
            >
              {grades.map((grade) => (

            <MenuItem key={grade} value={grade}> {grade} </MenuItem>
              ))}
          </Select>
          </FormControl>
        </Grid>
        <Grid item container xs={6}>
        <TextField
          onChange={handleChange}
          variant={"outlined"}
          name="previouspercentage"
          label="Percentage"
          value={newUserData.previouspercentage}
          fullWidth
        ></TextField>
        </Grid>
      <Grid item container xs={12}>
        <TextField
          onChange={handleChange}
          variant={"outlined"}
          label="Location"
          name="address"
          required
          value={newUserData.address}
          fullWidth
        ></TextField>
      </Grid>
      <Grid item container xs={12}>
        <TextField
          onChange={handleChange}
          variant={"filled"}
          label="Bio"
          name="about"
          value={newUserData.about}
          fullWidth
          multiline
          rows={5}
        ></TextField>
      </Grid>
      <Grid item container xs={12} justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={saveAndClose}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileEdit;
