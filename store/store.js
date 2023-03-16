import { configureStore } from "@reduxjs/toolkit";
import cvReducer from "./slices/cv";

const store = configureStore({
  reducer: {
    cv: cvReducer,
  },
});

export default store;
