import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import thunkMiddleware from "redux-thunk";

const reducer = {
  auth: authReducer,
  message: messageReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
  middleware: [thunkMiddleware],
});
