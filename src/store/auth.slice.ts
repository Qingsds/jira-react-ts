import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import { AuthForm, bootstrapUser } from "../context/auth-context";
import { User } from "../screen/project-list";
import * as auth from "../auth-provider";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setState(state, action) {
      state.user = action.payload;
    },
  },
});

const { setState } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setState(user)));

export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setState(user)));

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setState(null)));

export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setState(user)));
