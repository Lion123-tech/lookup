import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { apiDomain } from "../config";
import { fetchUser } from "./authSlice";
import { closeModal } from "./uiSlice";

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

export const updateUserData = createAsyncThunk(
  "profile/updateUserData",
  async (userData, thunkAPI) => {
    console.log(userData)
    if (isBlank(userData.username) || isBlank(userData.school) || isBlank(userData.address)) {
      toast.error("Please fill all required fields")
      return thunkAPI.rejectWithValue("Empty required fields")
    }
    if (isNaN(userData.previouspercentage) || userData.previouspercentage < 0 || userData.previouspercentage > 100){
      toast.error("Invalid percentage")
      return thunkAPI.rejectWithValue("Invalid percentage")
    }
    // assuming api success until backend is in place
    await fetch(`${apiDomain}/user/edituser`, {
      method: 'PUT',
      headers: {
          'Authorization': localStorage.getItem("jwt"),
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
  });
    toast.success("Updated profile")
    thunkAPI.dispatch(closeModal())
    thunkAPI.dispatch(fetchUser())
    return userData;
  }
  );
  
  export const addAchievement = createAsyncThunk(
    "profile/addAchievement",
    async (achievementData, thunkAPI) => {
      const endpoints = {
        projects: `${apiDomain}/user/addprojects`,
        awards: `${apiDomain}/user/addawards`,
        internships: `${apiDomain}/user/addinternships`,
        scholarships: `${apiDomain}/user/addscholarships`,
        others: `${apiDomain}/user/addothers`
      }
      if (isBlank(achievementData.data.title) || isBlank(achievementData.data.description) || isBlank(achievementData.data.year)) {
        toast.error("Please fill all required fields")
        return thunkAPI.rejectWithValue("Empty required fields")
      }
      if (isNaN(achievementData.data.year)){
        toast.error("Invalid year")
        return thunkAPI.rejectWithValue("yearinvalid")
        
      }
      // Assuming sucess and random nanoid until backend is in place
      await fetch(endpoints[achievementData.type], {
    method: 'PUT',
    headers: {
        'Authorization': localStorage.getItem("jwt"),
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(achievementData.data)
});

      thunkAPI.dispatch(closeModal())
      toast.success("Added!")
      thunkAPI.dispatch(fetchUser())
      return { ...achievementData, id: nanoid() };
    }
    );
    
    export const addSkill = createAsyncThunk(
      "profile/addSkill",
      async(skill, thunkAPI) => {
        if (isBlank(skill)){
          toast.error("Skill title cannot be empty")
          return thunkAPI.rejectWithValue("Empty value")
       }
      await fetch(`${apiDomain}/user/addskill`, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({skill: skill})
    });
      thunkAPI.dispatch(closeModal())
      thunkAPI.dispatch(fetchUser())
      toast.success("Added!")
      return skill;
    
  }
)

export const delSkill = createAsyncThunk(
  "profile/delSkill",
  async(skill, thunkAPI) => {
    const delUrl = `${apiDomain}/user/deleteskill/`
    await fetch(delUrl, {
      method: 'PUT',
      headers: {
          'Authorization': localStorage.getItem("jwt"),
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({skill: skill})
    });
    thunkAPI.dispatch(fetchUser())
    return skill
  }
)

export const delAchievement = createAsyncThunk(
  "profile/delAchievement",
  async (data, thunkAPI) => {
    const endpoints = {
      projects: `${apiDomain}/user/deleteprojects/`,
      awards: `${apiDomain}/user/deleteawards/`,
      internships: `${apiDomain}/user/deleteinternships/`,
      scholarships: `${apiDomain}/user/deletescholarships/`,
      others: `${apiDomain}/user/deleteothers/`
    }
    const delUrl = endpoints[data.type] + data.id 
    await fetch(delUrl, {
      method: 'PUT',
      headers: {
          'Authorization': localStorage.getItem("jwt"),
          'Content-Type': 'application/json',
      },
    });
    thunkAPI.dispatch(fetchUser())
    return data;
  }
);

const userProfileSlice = createSlice({
  name: "profile",
  initialState: {
    username: "",
    about: "",
    education: {
      grade: "",
      address: "",
      school: "",
      previouspercentage: "",
    },
    projects: {},
    scholarships: {},
    awards: {},
    internships: {},
    others: {},
    skills: {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.basicData = action.payload;
      })
      .addCase(addAchievement.fulfilled, (state, action) => {
        state[action.payload.type][action.payload.id] = action.payload.data;
      })
      .addCase(delAchievement.fulfilled, (state, action) => {
        delete state[action.payload.type][action.payload.id];
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills[action.payload.id] = action.payload.skill
      })
      .addCase(delSkill.fulfilled, (state, action) => {
        delete state.skills[action.payload]
      });
  },
});

export default userProfileSlice.reducer;
