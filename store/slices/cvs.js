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
      console.log(payload);
      return produce(state, (draft) => {
        draft.push(payload);
      });
    },

    updateCV(state, { payload }) {
      return state.map((cv) => {
        return cv.id === payload.id ? payload : cv;
      });
    },

    deleteCV(state, { payload }) {
      return state.filter((cv) => cv.id !== payload);
    },
  },
});

export const { setData, addCV, updateCV, deleteCV } = cvSlice.actions;

export default cvSlice.reducer;
