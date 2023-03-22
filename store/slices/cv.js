import { createSlice } from "@reduxjs/toolkit";

const cvSlice = createSlice({
  name: "cv",
  initialState: {},
  reducers: {
    setData(state, { payload }) {
      console.log({ ...state });
      return { ...state, ...payload };
    },
  },
});

export const { setData } = cvSlice.actions;

export default cvSlice.reducer;
