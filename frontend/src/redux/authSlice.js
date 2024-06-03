import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    registerSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, registerSuccess, logoutSuccess } =
  authSlice.actions;

export default authSlice.reducer;
