import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user.slice';
import thunk from 'redux-thunk';
// import { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: {
    users: userReducer
  },
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
//enhance the AppDispatch to be aware of thunk
export type AppDispatch = typeof store.dispatch;


export default store;
