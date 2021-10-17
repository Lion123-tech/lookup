import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addAchievement } from "../../store/userProfileSlice";

const useStyles = makeStyles((theme) => ({
  editContainer: {
    padding: theme.spacing(2),
  },
}));

const AddAchievement = ({ type }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [certData, setCertData] = useState({ title: "", description: "", year: "" });
  const handleChange = (e) => {
    setCertData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const saveAndClose = () => {
    dispatch(
      addAchievement({
        type: type,
        data: {
          title: certData.title,
          description: certData.description,
          year: certData.year,
        },
      })
    );
  };
  return (
    <Grid container className={classes.editContainer} spacing={2}>
      <Grid item xs={8}>
        <TextField
          onChange={handleChange}
          variant={"outlined"}
          value={certData.title}
          label="Title"
          name="title"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          onChange={handleChange}
          variant={"outlined"}
          value={certData.year}
          label="Year"
          name="year"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={handleChange}
          variant="filled"
          multiline
          rows={5}
          value={certData.description}
          label="Description"
          name="description"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button onClick={saveAndClose} color="primary" variant="contained">
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddAchievement;
