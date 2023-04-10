import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import Categorys from "./views/Categorys";
import CategoryForm from "./views/CategoryForm";
import Suppliers from "./views/Suppliers";
import SupplierForm from "./views/SupplierForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/categorys',
        element: <Categorys/>
      },
      {
        path: '/categorys/new',
        element: <CategoryForm key="categoryCreate" />
      },
      {
        path: '/categorys/:id',
        element: <CategoryForm key="categoryUpdate" />
      },
      {
        path: '/suppliers',
        element: <Suppliers/>
      },
      {
        path: '/suppliers/new',
        element: <SupplierForm key="supplierCreate" />
      },
      {
        path: '/suppliers/:id',
        element: <SupplierForm key="supplierUpdate" />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
