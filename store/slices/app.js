import produce from "immer";
import { createSlice } from "@reduxjs/toolkit";

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

    addPosition(state, _) {
      return produce(state, (draft) => {
        draft.cv.positions = draft.cv.positions || [];
        draft.cv.positions.push({ id: crypto.randomUUID() });
      });
    },

    createPositionProject(state, { payload }) {
      return produce(state, (draft) => {
        const position = draft.cv.positions.find(({ id }) => id === payload);
        const projects = position.projects || [];

        projects.push({
          id: crypto.randomUUID(),
        });

        position.projects = projects;
      });
    },

    deletePositionProject(state, { payload }) {
      return produce(state, (draft) => {
        const position = draft.cv.positions.find(
          ({ id }) => id === payload.positionID
        );
        const projects = position.projects;
        position.projects = projects.filter(
          (project) => project.id !== payload.projectID
        );
      });
    },

    deletePosition(state, { payload }) {
      return produce(state, (draft) => {
        draft.cv.positions = draft.cv.positions.filter(
          ({ id }) => id !== payload
        );
      });
    },

    swapPositions(state, { payload }) {
      return produce(state, (draft) => {
        const positions = draft.cv.positions;
        const [x, y] = payload;
        [positions[x], positions[y]] = [positions[y], positions[x]];
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
          draft.cv.languages[index][pair[0]] = pair[1];
        });
      });
    },

    addLanguage(state) {
      return produce(state, (draft) => {
        draft.cv.languages = draft.cv.languages || [];
        draft.cv.languages.push({
          name: "",
          note: "",
        });
      });
    },

    deleteLanguage(state, { payload }) {
      return produce(state, (draft) => {
        draft.cv.languages.splice(payload, 1);
      });
    },

    addEducation(state) {
      return produce(state, (draft) => {
        draft.cv.education = draft.cv.education || [];
        draft.cv.education.push({
          name: "",
          description: "",
        });
      });
    },

    editEducation(state, { payload }) {
      return produce(state, (draft) => {
        draft.cv.education[payload.index][payload.prop] = payload.value;
      });
    },

    deleteEducation(state, { payload }) {
      return produce(state, (draft) => {
        draft.cv.education.splice(payload, 1);
      });
    },

    addProject(state) {
      return produce(state, (draft) => {
        if (!draft.cv.projects) draft.cv.projects = [];
        draft.cv.projects.push({
          name: "",
          role: "",
          description: "",
          environment: "",
          references: [],
          id: crypto.randomUUID(),
        });
      });
    },

    editProject(state, { payload }) {
      return produce(state, (draft) => {
        const { id, prop, value } = payload;
        const project = draft.cv.projects.find((project) => project.id === id);

        project[prop] = value;
      });
    },

    deleteProject(state, { payload }) {
      return produce(state, (draft) => {
        draft.cv.projects = draft.cv.projects.filter(
          (project) => project.id !== payload
        );
      });
    },
  },
});

export const {
  setData,
  addPosition,
  updatePosition,
  createPositionProject,
  deletePositionProject,
  swapPositions,
  updateCv,
  deletePosition,
  updateLanguages,
  deleteLanguage,
  addLanguage,
  addEducation,
  deleteEducation,
  editEducation,
  addProject,
  editProject,
  deleteProject,
} = appSlice.actions;

export default appSlice.reducer;
