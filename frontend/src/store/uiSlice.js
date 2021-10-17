import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modal: {
      modalOpen: false,
      modalView: "awards",
    },
    eventDrawer: {
      drawerOpen: false,
      eventID: "",
    }
  },
  reducers: {
    openModal(state, action) {
      state.modal.modalOpen = true;
      state.modal.modalView = action.payload;
    },
    closeModal(state) {
      state.modal.modalOpen = false;
    },
    openEventDrawer(state, action) {
      state.eventDrawer.drawerOpen = true;
      state.eventDrawer.eventID = action.payload;
    },
    closeEventDrawer(state) {
      state.eventDrawer.drawerOpen = false;
    }
  },
});

export const { openModal, closeModal, openEventDrawer, closeEventDrawer } = uiSlice.actions;
export default uiSlice.reducer;
