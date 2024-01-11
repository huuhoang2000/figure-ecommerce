import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchLoginValidation = createAsyncThunk('login/fetchLoginValidation', async ({username, password}) => {
  const response = await axios.post('https://fakestoreapi.com/auth/login', {username, password});

  if (!response.ok) {
    throw new Error('Invalid username or password');
  }

  return response.data;
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    token: null,
    loading: 'idle',
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchLoginValidation.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(fetchLoginValidation.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.token = action.payload;                 //store token in redux
      localStorage.setItem('token', action.payload);//store token in localstorage
    })
    .addCase(fetchLoginValidation.rejected, (state, action) => {
      state.loading = 'failed';
      state.token = action.error.message;

    })
  }
})

export const loginReducer = loginSlice.reducer;

export const { login, logout } = loginSlice.actions;
