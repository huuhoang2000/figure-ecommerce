import { configureStore } from '@reduxjs/toolkit';
import { reducerAdmin } from './slices/user.slice';
// import rootReducer from './reducers';

const store = configureStore({
  reducer: {
    admin: reducerAdmin
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
