import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";

interface State {
  AllUsers: User[];
  UserDetail: User | null;
}

const initialState: State = {
  AllUsers: [],
  UserDetail: null,
}

type userRole = 'user' | 'admin';

interface UpdateRoleAction {
  id: string;
  targetInfo: userRole;
}

interface UpdateInfoAction {
  id: string;
  AdminFormDetail: User;
}

//error not explicitly define the type of the initial state.
const adminSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    createUser: (state, action:PayloadAction<User>) => {
      const userDetail = action.payload;
      const user = new User(userDetail.userid, userDetail.username, userDetail.email, userDetail.password);
      state.AllUsers.push(user);
    },
    updateRole: (state, action:PayloadAction<UpdateRoleAction>) => {
      const {id, targetInfo} = action.payload;
      const index = state.AllUsers.findIndex(user => user.userid === id);
      state.AllUsers[index].role = targetInfo;
    },
    softDeleteUser:  (state, action:PayloadAction<string>) => {
      const id = action.payload;
      const index = state.AllUsers.findIndex(user => user.userid === id)
      state.AllUsers[index].isDeleted = true;
    },
    updateInfo: (state, action:PayloadAction<UpdateInfoAction>) => {
      const {id, AdminFormDetail } = action.payload;

      const index = state.AllUsers.findIndex(
        (user) => user.userid === id && !user.isDeleted
      );

      state.AllUsers[index] = {
        ...state.AllUsers[index],
        userid: AdminFormDetail.userid,
        username: AdminFormDetail.username,
        password: AdminFormDetail.password,
        email: AdminFormDetail.email,
        role: AdminFormDetail.role, 
      }
    }, 
    setUserDetails: (state, action:PayloadAction<string>) => {
      const id = action.payload;
      const userDetail = state.AllUsers.find((user) => {
        return user.userid === id && !user.isDeleted;
      });
      state.UserDetail = userDetail || null;
    }    
    
  }
})

export const { createUser, updateRole, softDeleteUser, updateInfo, 
  setUserDetails} = adminSlice.actions;

export const reducerAdmin = adminSlice.reducer;

