import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./LoginDataSlice";

export const store = configureStore({
  reducer: {
    login: LoginReducer,
  },
});
