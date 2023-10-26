import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user.slice';

const store = configureStore({
  reducer: {
    users: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
//dispatch function in redux store.
export default store;
