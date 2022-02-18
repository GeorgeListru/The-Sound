import { createSlice } from "@reduxjs/toolkit";

const loginData = JSON.parse(localStorage.getItem("loginData"));
const initialState = loginData || {};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("loginData", JSON.stringify(action.payload));
      return action.payload;
    },
    logout: (state) => {
      return {};
    },
  },
});

export const { login, logout } = LoginSlice.actions;

export default LoginSlice.reducer;
