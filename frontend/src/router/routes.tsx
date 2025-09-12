import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Guest from "../layouts/Guest";
import AuthProvider from "../context/AuthContext";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";


const Login = lazy(() => import('../pages/Login'));
const Companies = lazy(() => import('../pages/Companies'));
const CompanyCreate = lazy(() => import('../pages/CompanyCreate'));
const CompanyEdit = lazy(() => import('../pages/CompanyEdit'));
const CompanyDetail = lazy(() => import('../pages/CompanyDetail'));
const Employees = lazy(() => import('../pages/Employees'));
const EmployeeCreate = lazy(() => import('../pages/EmployeeCreate'));
const EmployeeEdit = lazy(() => import('../pages/EmployeeEdit'));
const EmployeeDetail = lazy(() => import('../pages/EmployeeDetail'));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Root />
      </AuthProvider>
    ),
    children: [
      { index: true, Component: Home },
      {
        path: "companies",
        children: [
          { index: true, Component: Companies },
          { path: ":id/edit", Component: CompanyEdit },
          { path: ":id/details", Component: CompanyDetail },
          { path: "create", Component: CompanyCreate },
        ],
      },
      {
        path: "employees",
        children: [
          { index: true, Component: Employees },
          { path: ":id/edit", Component: EmployeeEdit },
          { path: ":id/details", Component: EmployeeDetail },
          { path: "create", Component: EmployeeCreate },
        ],
      },
    ],
  },
  {
    element: (
      <AuthProvider>
        <Guest />
      </AuthProvider>
    ),
    children: [
      { path: "login", Component: Login },
    
    ],
  },
  { path: "*", Component: NotFound },
]);
