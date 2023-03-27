import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const cvSlice = createSlice({
  name: "cv",
  initialState: [],
  reducers: {
    setData(state, { payload }) {
      return payload;
    },

    addCV(state, { payload }) {
      return produce(state, (draft) => {
        draft.push(payload);
      });
    },
  },
});

export const { setData, addCV } = cvSlice.actions;

export default cvSlice.reducer;
