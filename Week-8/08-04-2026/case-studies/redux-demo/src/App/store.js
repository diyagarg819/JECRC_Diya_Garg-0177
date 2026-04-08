import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Features/Counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

