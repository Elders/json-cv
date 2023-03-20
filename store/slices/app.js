import produce from "immer";
import { createSlice } from "@reduxjs/toolkit";
import findPosition from "@/helpers/findPosition";

const appSlice = createSlice({
  name: "app",
  initialState: {},
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload };
    },

    updatePosition(state, { payload }) {
      const { positionID, ...rest } = payload;

      return produce(state, (draft) => {
        const positionIndex = draft.cv.positions.findIndex(
          ({ id }) => id === positionID
        );
        const newPosition = { ...draft.cv.positions[positionIndex], ...rest };
        draft.cv.positions[positionIndex] = newPosition;
      });
    },

    createPosition(state, _) {
      return produce(state, (draft) => {
        draft.cv.positions.push({ id: crypto.randomUUID() });
      });
    },

    deletePosition(state, { payload }) {
      return produce(state, (draft) => {
        draft.cv.positions = draft.cv.positions.filter(
          ({ id }) => id !== payload
        );
      });
    },

    updateCv(state, { payload }) {
      return produce(state, (draft) => {
        Object.entries(payload).forEach((pair) => {
          draft.cv[pair[0]] = pair[1];
        });
      });
    },

    updateLanguages(state, { payload }) {
      const [props, index] = payload;

      return produce(state, (draft) => {
        props.forEach((pair) => {
          console.log(pair);
          draft.cv.languages[index][pair[0]] = pair[1];
        });
      });
    },
  },
});

export const {
  setData,
  createPosition,
  updatePosition,
  updateCv,
  deletePosition,
  updateLanguages,
} = appSlice.actions;

export default appSlice.reducer;
