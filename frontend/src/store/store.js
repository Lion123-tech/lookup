import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uiSlice from "./uiSlice";
import userProfileSlice from "./userProfileSlice";
export const store = configureStore({
  reducer: {
    userProfile: userProfileSlice,
    auth: authSlice,
    ui: uiSlice,
  },
});
