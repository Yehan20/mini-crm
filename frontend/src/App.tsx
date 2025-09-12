

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './styles/App.css'
import { lazy } from "react";
import Guest from './layouts/Guest.tsx'
import Register from "./pages/Register.tsx";
import AuthProvider from "./context/AuthContext.tsx";

import Root from "./layouts/Root.tsx";

import NotFound from "./pages/NotFound.tsx";

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Companies = lazy(() => import('./pages/Companies'));
const CompanyCreate = lazy(() => import('./pages/CompanyCreate'));
const CompanyEdit = lazy(() => import('./pages/CompanyEdit'));
const CompanyDetail = lazy(() => import("./pages/CompanyDetail.tsx"));
const Employees = lazy(() => import('./pages/Employees'));
const EmployeeCreate = lazy(() => import('./pages/EmployeeCreate'));
const EmployeeEdit = lazy(() => import('./pages/EmployeeEdit'));
const EmployeeDetail = lazy(() => import('./pages/EmployeeDetail.tsx'));




const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Root />
      </AuthProvider>
    ),


    children: [
      { index: true, Component: Home },
      // { path: "about", Component: About },
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
      </AuthProvider>),
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },

  // 404
  // 404 fallback
  { path: "*", Component: NotFound },
]);




function App() {

  return (
    <RouterProvider router={router} />


  )
}

export default App
