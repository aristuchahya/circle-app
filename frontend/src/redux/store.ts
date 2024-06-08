import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import threadReducer from "./slices/thread";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
