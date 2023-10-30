import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";
import localStorageUtil from "../../utils/local-storage.util";
import axios from 'axios';

//perform a  GET request
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://fakestoreapi.com/users');
  return response.data;
})

//perform a POST request
export const createUsers = createAsyncThunk('users/createUsers', async (post) => {
  const response = await axios.post('https://fakestoreapi.com/users', post);
  return response.data;
}) 

export interface UserState {
  allUsers: User[];
  userDetail: User | null;
  loading: 'idle' | 'succeeded' | 'failed' | 'loading'
}

const initialState: UserState = {
  allUsers: (JSON.parse(localStorage.getItem("users") as string)?.allUsers as User[]) ?? [],
  userDetail: null,
  loading: 'idle',
}

type userRole = 'user' | 'admin';

interface UpdateRoleAction {
  id: string;
  targetInfo: userRole;
}

interface UpdateInfoAction {
  id: string;
  adminFormDetail: User;
}

interface softDeletePayload {
  id: string;
  value: boolean;
}


//error not explicitly define the type of the initial state.
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action:PayloadAction<User>) => {
      const userDetail = action.payload;
      const user = new User(userDetail.userid, userDetail.username, userDetail.email, userDetail.password, userDetail.name, userDetail.phone, userDetail.address);
      state.allUsers.push(user);
      localStorageUtil.refreshUsers(state);
    },
    updateRole: (state, action:PayloadAction<UpdateRoleAction>) => {
      const {id, targetInfo} = action.payload;
      const index = state.allUsers.findIndex(user => user.userid === id);
      state.allUsers[index].role = targetInfo;
    },
    softDeleteUser:  (state, action:PayloadAction<softDeletePayload>) => {
      const {id, value} = action.payload;
      const index = state.allUsers.findIndex(user => user.userid === id)
      state.allUsers[index].isDeleted = value;
      localStorageUtil.refreshUsers(state);
    },
    hardDeleteUser: (state, action: PayloadAction<string>) => {
      const id: string = action.payload;
      state.allUsers = state.allUsers.filter(user => user.userid !== id);
      localStorageUtil.refreshUsers(state);
    },
    updateInfo: (state, action:PayloadAction<UpdateInfoAction>) => {
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
    setUserDetails: (state, action:PayloadAction<string>) => {
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
      .addCase(createUsers.fulfilled, (state, action) => {
        state.allUsers.push(action.payload);
      })
  },
})

export const { 
  createUser, updateRole, softDeleteUser, hardDeleteUser, updateInfo, 
  setUserDetails} = usersSlice.actions;

export const userReducer = usersSlice.reducer;

      // .addCase(fetchUsers.rejected, (state, action) => {
      //   state.loading = 'failed';
      //   state.error = action.error.message;
      // })
