import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  requests: []
};

const requestsSlice: any = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: (state: any, { payload }) => {
      state.push(payload);
    },
    updateRequests: (state: any, { payload }) => {
      state.requests = payload;
    },
    updateRequest: (state: any, { payload }) => {
      state = state.filter((request: any) => {
        return request.id != payload;
      });
    },
    resetRequests: (state: any) => {
      state.requests = [];
    }
  }
});

export const { addRequest, updateRequests, updateRequest, resetRequests } =
  requestsSlice.actions;

export default requestsSlice.reducer;
