import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/app";
import cvsReducer from "./slices/cvs";

const store = configureStore({
  reducer: {
    app: appReducer,
    cvs: cvsReducer,
  },
});

export default store;
