import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import universityReducer from "../features/university/universitySlice";

export const store = configureStore({
  reducer: {
    university: universityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
