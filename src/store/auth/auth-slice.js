import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storedToken || "",
    isLoggedIn: !!storedToken,
  },
  reducers: {
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
    },
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
