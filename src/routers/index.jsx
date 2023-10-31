import { createBrowserRouter, redirect } from "react-router-dom";
// import UserList from "../pages/UserList";
import AddUser from "../pages/User/AddUser";
import PageNotFound from "../pages/User/PageNotFound";
import UpdateUserProfile from "../pages/User/UpdateUserProfile";
import UserList from "../pages/User/UserList";
import Store from "../pages/Store";
import Admin from "../pages/User";
import UserDetail from "../pages/User/UserDetail";
import Bin from "../pages/User/Bin";

// store : "/" => buy

// admin: "/admin" => manage CRUD

const router = createBrowserRouter([
  {
    path: "/",
    element: <Store />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin",
        loader: () => redirect('/admin/userList')
      },
      {
        path: "/admin/userList",
        element: <UserList />,
      },
      {
        path: "/admin/user-detail/:id",
        element: <UserDetail />,
      },
      {
        path: "/admin/add-user",
        element: <AddUser />,
      },
      {
        path: "/admin/update-user/:id",
        element: <UpdateUserProfile />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/admin/trash",
        element: <Bin />
      }
    ],
  },
]);

export default router;
