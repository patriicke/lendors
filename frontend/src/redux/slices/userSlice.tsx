import { createSlice } from "@reduxjs/toolkit";
import { IUser, ROLE } from "../../types/userTypes";

const initialState: IUser = {
  isLoggedIn: false,
  role: ROLE.STANDARD
};

const userReducer: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: IUser, { payload }) => {
      state = payload;
    },
    logout: (state: IUser, { payload }) => {
      state = { isLoggedIn: false, role: ROLE.STANDARD };
    },
    update: (state: IUser, { payload }) => {
      state = payload;
    }
  }
});

export const { login, logout, update } = userReducer.actions;

export default userReducer.reducer;
