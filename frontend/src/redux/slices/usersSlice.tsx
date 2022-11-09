import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";
const initialState = {
  users: []
};
const usersSlice: any = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state: any, { payload }) => {
      state.users = payload;
    },
    deleteUserRedux: (state: any, { payload }) => {
      state.users = state.users.filter((user: IUser) => {
        return user.id != payload;
      });
    },
    resetUsers: (state: any) => {
      state.users = [];
    }
  }
});

export const { updateUsers, resetUsers ,deleteUserRedux} = usersSlice.actions;

export default usersSlice.reducer;
