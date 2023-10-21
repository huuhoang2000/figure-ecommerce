import { createBrowserRouter, redirect } from "react-router-dom";
// import UserList from "../pages/UserList";
import DetailOfUser from "../pages/UserDetail";
import AddUser from "../pages/AddUser";
import PageNotFound from "../pages/PageNotFound";
import UpdateUserProfile from "../pages/UpdateUserProfile";
import UserList from "../pages/UserList";

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return redirect('/user')
    }
  },
  {
    path: '/userlist',
    element: <UserList />
  },
  {
    path: '/user-detail/:id',
    element: <DetailOfUser />
  },
  {
    path: '/add-user',
    element: <AddUser />
  },
  {
    path: '/update-user/:id',
    element: <UpdateUserProfile />
  },
  {
    path: '*',
    element: <PageNotFound />
  }

]);

export default router;
