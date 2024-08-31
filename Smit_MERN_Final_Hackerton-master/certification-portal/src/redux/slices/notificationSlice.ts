// redux/slices/notificationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    id: string;
    message: string;
    batchId: string;
    isSent: boolean;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            );
        },
        markAsSent: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(
                (n) => n.id === action.payload
            );
            if (notification) {
                notification.isSent = true;
            }
        },
    },
});

export const { addNotification, removeNotification, markAsSent } = notificationSlice.actions;
export default notificationSlice.reducer;
