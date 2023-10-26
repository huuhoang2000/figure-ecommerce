import { UserState } from "../redux/slices/user.slice"

class localStorageUtil {
  static refreshUsers(state: UserState) {
    localStorage.setItem("users", JSON.stringify(state));
  }

  static initializeUsersStorage(state: UserState) {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users",JSON.stringify(state));
    }
  }
}

export default localStorageUtil;
