import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface State {
  projectOpenModal: boolean;
}

const initialState: State = {
  projectOpenModal: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectOpenModal = true;
    },
    closeProjectModal(state) {
      state.projectOpenModal = false;
    },
  },
});

export const projectListAction = projectListSlice.actions;
export const selectProjectOpenModal = (state: RootState) => state.projectList.projectOpenModal;
