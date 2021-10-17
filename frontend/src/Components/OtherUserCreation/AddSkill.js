import { Button, Grid, TextField } from "@material-ui/core"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSkill } from "../../store/userProfileSlice";
import { toast } from "react-toastify";

export const AddSkill = () => {
    const [skillTitle, setSkillTitle] = useState("");
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setSkillTitle(e.target.value)

    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                label="Skill Title"
                value={skillTitle}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            <Grid item container justifyContent="center">
                <Button color="primary" variant="contained"
                onClick={() => {dispatch(addSkill(skillTitle))}}
                >
                    Save
                </Button>
            </Grid>

        </Grid>
    )
}