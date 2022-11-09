import { createSlice } from "@reduxjs/toolkit";
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
    resetUsers: (state: any) => {
      state.users = [];
    }
  }
});

export const { updateUsers, resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
