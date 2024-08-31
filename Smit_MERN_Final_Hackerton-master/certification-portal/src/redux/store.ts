// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/notificationSlice'; // Remove userReducer

const store = configureStore({
    reducer: {
        notifications: notificationReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
