import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";

interface State {
  allUsers: User[];
  userDetail: User | null;
}

const initialState: State = {
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
  AdminFormDetail: User;
}

//error not explicitly define the type of the initial state.
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    createUser: (state, action:PayloadAction<User>) => {
      const userDetail = action.payload;
      const user = new User(userDetail.userid, userDetail.username, userDetail.email, userDetail.password);
      state.allUsers.push(user);
    },
    updateRole: (state, action:PayloadAction<UpdateRoleAction>) => {
      const {id, targetInfo} = action.payload;
      const index = state.allUsers.findIndex(user => user.userid === id);
      state.allUsers[index].role = targetInfo;
    },
    softDeleteUser:  (state, action:PayloadAction<string>) => {
      const id = action.payload;
      const index = state.allUsers.findIndex(user => user.userid === id)
      state.allUsers[index].isDeleted = true;
    },
    updateInfo: (state, action:PayloadAction<UpdateInfoAction>) => {
      const {id, AdminFormDetail } = action.payload;

      const index = state.allUsers.findIndex(
        (user) => user.userid === id && !user.isDeleted
      );

      state.allUsers[index] = {
        ...state.allUsers[index],
        userid: AdminFormDetail.userid,
        username: AdminFormDetail.username,
        password: AdminFormDetail.password,
        email: AdminFormDetail.email,
        role: AdminFormDetail.role, 
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

export const { createUser, updateRole, softDeleteUser, updateInfo, 
  setUserDetails} = userSlice.actions;

export const userReducer = userSlice.reducer;

