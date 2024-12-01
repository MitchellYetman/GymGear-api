import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx'
import Cart from './routes/Cart.jsx'
import Checkout from './routes/Checkout.jsx'
import Confirmation from './routes/Confirmation.jsx'
import Details from './routes/Details.jsx'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import Logout from './routes/Logout.jsx'
import Signup from './routes/Signup.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Details/:id",
        element: <Details />
      },
      {
        path: "/Signup",
        element: <Signup />
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: "/Logout",
        element: <Logout />
      },
      {
        path: "/Cart",
        element: <Cart />
      },
      {
        path: "/Checkout",
        element: <Checkout />
      },
      {
        path: "/Confirmation",
        element: <Confirmation />
      },
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
