import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/app";
import cvReducer from "./slices/cv";

const store = configureStore({
  reducer: {
    app: appReducer,
    cv: cvReducer,
  },
});

export default store;
