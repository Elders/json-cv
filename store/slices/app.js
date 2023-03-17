import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {},
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { setData } = appSlice.actions;

export default appSlice.reducer;
