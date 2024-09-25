import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || null),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = action.payload.data;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logout Success");
    },
    registerUser: (state, action) => {
      const user = action.payload.data;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

export const { loginUser, logoutUser, registerUser } = userSlice.actions;

export default userSlice.reducer;
