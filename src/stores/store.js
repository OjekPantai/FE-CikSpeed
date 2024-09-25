import userReducer from "@/features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    userState: userReducer,
  },
});
