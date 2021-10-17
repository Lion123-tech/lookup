import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiDomain } from "../config";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (thunkAPI) => {
    const res = await fetch(`${apiDomain}/protected`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    });
    const user = await fetch(`${apiDomain}/user/getuser`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    });
    const userjson = await user.json()
    const res2 = await res.json();
    console.log("json res2", res2);
    // .then((res) => {
    //         if (res.status !== 200) {
    //             throw new Error("Unauthorized")
    //         }
    //         else {
    //             console.log("frontend res ", res)

    //             return res.json()
    //         }
    //     })
    //     .then((res => res._json))
    // console.log("jwt storage",res2.token)
    // localStorage.setitem("jwt",res2.token)
    localStorage.setItem("jwt", res2.token);
    console.log(userjson)
    return userjson.loginuser;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    userInfo: {
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload){
        state.loggedIn = true;
        state.userInfo = {
          id: action.payload._id,
          name: action.payload.username,
          picture: action.payload.pic,
          email: action.payload.email,
          token: action.payload.token,
          ...action.payload
        };
      }
    });
  },
});

export default authSlice.reducer;
