import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import localStorageUtil from "../../utils/local-storage.util";
import axios from 'axios';

//perform a  GET request
export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://fakestoreapi.com/users');
  return response.data;
})

//perform a POST request
export const createUser = createAsyncThunk('users/createUsers', async (post) => {
  const response = await axios.post('https://fakestoreapi.com/users', post);
  return response.data;
}) 

//error not explicitly define the type of the initial state.
const usersSlice = createSlice({
  name: "user",
  initialState: {users: [], loading:'idle'},
  reducers: {
    updateRole: (state, action) => {
      const {id, targetInfo} = action.payload;
      const index = state.allUsers.findIndex(user => user.userid === id);
      state.allUsers[index].role = targetInfo;
    },
    softDeleteUser:  (state, action) => {
      const {id, value} = action.payload;
      const index = state.allUsers.findIndex(user => user.userid === id)
      state.allUsers[index].isDeleted = value;
      localStorageUtil.refreshUsers(state);
    },
    hardDeleteUser: (state, action) => {
      const id = action.payload;
      state.allUsers = state.allUsers.filter(user => user.userid !== id);
      localStorageUtil.refreshUsers(state);
    },
    updateInfo: (state, action) => {
      const {id, adminFormDetail } = action.payload;

      const index = state.allUsers.findIndex(
        (user) => user.userid === id && !user.isDeleted
      );

      state.allUsers[index] = {
        ...state.allUsers[index],
        userid: adminFormDetail.userid,
        username: adminFormDetail.username,
        password: adminFormDetail.password,
        email: adminFormDetail.email,
        name: adminFormDetail.name,
        phone: adminFormDetail.phone,
        address: adminFormDetail.address,
      }
    }, 
    setUserDetails: (state, action) => {
      const id = action.payload;
      const userDetail = state.allUsers.find((user) => {
        return user.userid === id && !user.isDeleted;
      });
      state.userDetail = userDetail || null;
    }    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.allUsers = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = 'failed';
        state.entities = action.error.message;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.allUsers.push(action.payload);
      })
  },
})

export const { 
  updateRole, softDeleteUser, hardDeleteUser, updateInfo, 
  setUserDetails} = usersSlice.actions;

export const userReducer = usersSlice.reducer;
