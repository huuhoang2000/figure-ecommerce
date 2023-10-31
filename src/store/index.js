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

export default store;
