import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  requests: []
};

const requestsSlice: any = createSlice({
  name: "requests",
  initialState,
  reducers: {
    updateRequests: (state: any, { payload }) => {
      state.requests = payload;
    },
    updateRequest: (state: any, { payload }) => {
      state.requests = state.requests.map((request: any) =>
        request.id == payload.id ? payload : request
      );
    },
    resetRequests: (state: any) => {
      state.requests = [];
    }
  }
});

export const { updateRequests, updateRequest, resetRequests } =
  requestsSlice.actions;

export default requestsSlice.reducer;
