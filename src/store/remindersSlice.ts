import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IReminder } from '../interfaces/reminder.interface';
import { IReminders } from '../interfaces/reminders.interface';

const initialState: IReminders = {
    reminders: []
};

export const remindersSlice = createSlice({
    name: 'reminders',
    initialState,
    reducers: {
      addReminder: (state, action: PayloadAction<IReminder>) => {
        state.reminders = [
            ...state.reminders,
            {
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email: action.payload.email,
                birth_date: action.payload.birth_date,
                interests: action.payload.interests,
                minus_two_weeks: action.payload.minus_two_weeks,
                alert_display: action.payload.alert_display
            }
        ];
      },
    },
});

export const { addReminder } = remindersSlice.actions;
export default remindersSlice.reducer;