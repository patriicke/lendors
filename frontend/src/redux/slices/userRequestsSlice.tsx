import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  requests: []
};

const requestsSlice: any = createSlice({
  name: "requests",
  initialState,
  reducers: {
    updateUserRequests: (state: any, { payload }) => {
      state.requests = payload;
    },
    resetUserRequests: (state: any) => {
      state.requests = [];
    }
  }
});

export const { updateUserRequests, resetUserRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
