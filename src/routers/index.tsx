import { createBrowserRouter, redirect } from "react-router-dom";
// import UserList from "../pages/UserList";
import AddUser from "../pages/Admin/AddUser";
import PageNotFound from "../pages/Admin/PageNotFound";
import UpdateUserProfile from "../pages/Admin/UpdateUserProfile";
import UserList from "../pages/Admin/UserList";
import Store from "../pages/Store";
import Admin from "../pages/Admin";
import UserDetail from "../pages/Admin/UserDetail";

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
    ],
  },
]);

export default router;
