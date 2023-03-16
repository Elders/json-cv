import { createSlice } from "@reduxjs/toolkit";

const cvSlice = createSlice({
  name: "cv",
  initialState: null,
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { setData } = cvSlice.actions;

export default cvSlice.reducer;
