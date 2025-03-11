import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import loadingReducer from "./slice/loadingSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      loading: loadingReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
