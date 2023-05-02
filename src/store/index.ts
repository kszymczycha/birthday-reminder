import { configureStore} from '@reduxjs/toolkit';
import { listenerMiddleware } from "./middleware";
import remindersSlice from './remindersSlice';

const remindersState = JSON.parse(localStorage.getItem("reminders") || "null");

const store = configureStore({
  preloadedState: {
    reminders: { reminders: remindersState === null ? [] : remindersState }
  },
  reducer: {
    reminders: remindersSlice
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware
  ]
});

export type RootState = ReturnType<typeof store.getState>;
export const addedReminders = (state: RootState) => state.reminders.reminders;
export default store;