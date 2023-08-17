import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "./config";
import { customerReducer } from "./features/customers-slice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;