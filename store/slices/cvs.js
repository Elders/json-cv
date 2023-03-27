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

    deleteCV(state, { payload }) {
      return state.filter((cv) => cv.id !== payload);
    },
  },
});

export const { setData, addCV, deleteCV } = cvSlice.actions;

export default cvSlice.reducer;
