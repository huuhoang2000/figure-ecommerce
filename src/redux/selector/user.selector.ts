import { createSelector } from "@reduxjs/toolkit";
import User from "../../models/User";

interface rootstate {
  users: {
    allUsers: User[];
    userDetail: User | null;
  };
}

export const getAllUsers = (state: rootstate) => state.users.allUsers.filter(t => !t.isDeleted);
export const getUserDetails = (state: rootstate) => state.users.userDetail;

const userState = (state: rootstate) => state.users;

export const getAllUsersFromBinSelector = createSelector(userState, (users) => users.userDetail) 
