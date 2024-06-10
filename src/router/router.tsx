import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import Us from "../pages/Us";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/us",
    element: <Us/>,
  }
]);