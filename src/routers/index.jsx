import { createBrowserRouter, redirect } from "react-router-dom";
import AddUser from "../pages/User/AddUser";
import PageNotFound from "../pages/PageNotFound";
import UpdateUser from "../pages/User/UpdateUser";
import UserList from "../pages/User/UserList";
import User from "../pages/User";
import UserDetail from "../pages/User/UserDetail";
import AddProduct from "../pages/Products/AddProduct";
import UpdateProduct from "../pages/Products/UpdateProduct";
import ProductList from "../pages/Products/ProductList";
import Products from "../pages/Products";
import ProductDetail from "../pages/Products/ProductDetail";
import MainPage from "../pages/MainPage/MainPage";
import UserLogin from "../pages/User/UserLogin";
import UserRegister from "../pages/User/UserRegister";
import Admin from "../pages/Admin";
import Carts from "../pages/Carts"
import AddNewCart from "../pages/Carts/AddNewCart";
import CartList from "../pages/Carts/CartList";
import AdminLogin from "../pages/Admin/AdminLogin";
import checkTokenLogin from "../components/TokenCheckLogin"
import { CartDetail } from "../pages/Carts/CartDetail";
import UpdateCart from "../pages/Carts/UpdateCart";
// store : "/" => buy

// user: "/user" => manage CRUD

const checkToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Store the current location in the session storage
    sessionStorage.setItem('preLoginLocation', window.location.pathname);
    return redirect('/admin/admin-login');
  }
  // return token ? null : redirect('/admin/admin-login');
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect('/mainpage'),
  },
  {
    path: "/mainpage",
    element: <MainPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/admin/index",
    element: <Admin/>,
  },
  {
    path: "/admin/admin-login",
    element: <AdminLogin/>,
    loader: checkTokenLogin,
  },
  {
    path: "/admin/user",
    element: <User />,
    children: [
      {
        path: "/admin/user",
        loader: () => redirect('/admin/user/user-list')
      },
      {
        path: "/admin/user/user-list",
        element: <UserList />,
        loader: checkToken,
      },
      {
        path: "/admin/user/user-detail/:id",
        element: <UserDetail />,
        loader: checkToken,
      },
      {
        path: "/admin/user/add-user",
        element: <AddUser />,
        loader: checkToken,
      },
      {
        path: "/admin/user/update-user/:id",
        element: <UpdateUser />,
        loader: checkToken,
      },
      {
        path: "/admin/user/user-login",
        element: <UserLogin />,
      },
      {
        path: "/admin/user/user-register",
        element: <UserRegister />,
      },
    ]
  },
  {
    path: "/admin/products",
    element: <Products />,
    children: [
      {
        path: "/admin/products/product-list",
        element: <ProductList />,
      },
      {
        path: "/admin/products/product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/admin/products/add-product",
        element: <AddProduct />,
        loader: checkToken,
      },
      {
        path: "/admin/products/update-product/:id",
        element: <UpdateProduct />,
        loader: checkToken,
      },
    ]
  },
  {
    path: "/admin/carts",
    element: <Carts />,
    children: [
      {
        path: "/admin/carts/cart-list",
        element: <CartList />,
      },
      {
        path: "/admin/carts/cart-detail/:id",
        element: <CartDetail />,
      },
      {
        path: "/admin/carts/add-cart",
        element: <AddNewCart />,
        loader: checkToken,
      },
      {
        path: "/admin/carts/update-cart/:id",
        element: <UpdateCart />,
        loader: checkToken,
      },
    ]
  },
]);


