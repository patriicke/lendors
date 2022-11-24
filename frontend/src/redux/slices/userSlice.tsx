import { createSlice } from "@reduxjs/toolkit";
import { IUser, ROLE } from "../../types/userTypes";

const initialState: {
  user: IUser;
  isLoggedIn: boolean;
} = {
  user: {},
  isLoggedIn: false
};

const userSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = { ...payload };
    },
    resetUser: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      window.location.replace(window.location.origin);
    },
    update: (state, { payload }) => {
      state = payload;
    }
  }
});

export const { login, resetUser, update } = userSlice.actions;

export default userSlice.reducer;
