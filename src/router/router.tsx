import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import Us from "../pages/Us";
import Wines from "../pages/Wines";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/us",
    element: <Us/>,
  },
  {
    path: "/wines",
    element: <Wines/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },

]);