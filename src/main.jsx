import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './components/Root';
import AllVisas from './components/AllVisas';
import Login from './components/Login';
import Register from './components/Register';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import AddVisa from './components/AddVisa';
import MyAddedVisa from './components/MyAddedVisa';
import MyVisaApplication from './components/MyVisaApplication';
import AuthProvider from './AuthProvider';
import ErrorPage from './components/ErrorPage';
import VisaDetails from './components/VisaDetails';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/all-visas',
        element: <AllVisas></AllVisas>
      },
      {
        path: '/add-visa',
        element: (<PrivateRoute> <AddVisa></AddVisa> </PrivateRoute>),
      },
      {
        path: '/my-added-visas',
        element: (<PrivateRoute> <MyAddedVisa></MyAddedVisa> </PrivateRoute>),
      },
      {
        path: '/my-visa-application',
        element: (<PrivateRoute> <MyVisaApplication></MyVisaApplication> </PrivateRoute>),
      },
      {
        path: '/visa-details/:id',
        element: (<PrivateRoute> <VisaDetails></VisaDetails> </PrivateRoute>),
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' autoClose={2000}></ToastContainer>
    </AuthProvider>
  </StrictMode>,
)
