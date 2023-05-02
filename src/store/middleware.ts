import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addReminder } from "./remindersSlice";
import type { RootState } from "./index";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(addReminder),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "reminders",
      JSON.stringify((listenerApi.getState() as RootState).reminders.reminders)
    )
});