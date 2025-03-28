import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import loginSlice from "./slice/loginSlice";
import verifySlice from './slice/verifySlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    login: loginSlice,
    verifySlice,
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
