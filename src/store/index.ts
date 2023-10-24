import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user.slice';
// import rootReducer from './reducers';

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
