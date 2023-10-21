import User from "../../models/User";

interface rootstate {
  user: {
    allUsers: User[];
    userDetail: User | null;
  };
}


export const getAllUsers = (state: rootstate) => state.user.allUsers.filter(t => !t.isDeleted);

export const getUserDetails = (state: rootstate) => state.user.userDetail;
