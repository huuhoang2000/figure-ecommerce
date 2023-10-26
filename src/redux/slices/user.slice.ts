import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";
import localStorageUtil from "../../utils/local-storage.util";

export interface UserState {
  allUsers: User[];
  userDetail: User | null;
}

const initialState: UserState = {
  allUsers: [],
  userDetail: null,
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
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    // getAllUser: (state , action) => {
    //   console.log(state);
      
    //   state.allUsers.filter(t => !t.isDeleted);
    // },
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
      state.allUsers = state.allUsers.filter((user) => user.userid !== id);
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
        role: adminFormDetail.role, 
      }
    }, 
    setUserDetails: (state, action:PayloadAction<string>) => {
      const id = action.payload;
      const userDetail = state.allUsers.find((user) => {
        return user.userid === id && !user.isDeleted;
      });
      state.userDetail = userDetail || null;
    }    
    
  }
})

export const { 
  // getAllUser, 
  createUser, updateRole, softDeleteUser, hardDeleteUser, updateInfo, 
  setUserDetails} = userSlice.actions;

export const userReducer = userSlice.reducer;

