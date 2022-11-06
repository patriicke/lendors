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
      console.log("payload", payload);
      state.isLoggedIn = true;
      state.user = { ...payload };
    },
    logout: (state) => {
      // state.user = { isLoggedIn: false, role: ROLE.USER };
    },
    update: (state, { payload }) => {
      state = payload;
    }
  }
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
