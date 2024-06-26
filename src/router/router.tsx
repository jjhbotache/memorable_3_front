import { createBrowserRouter } from "react-router-dom";
import { fetchPublicDesigns, fetchTags } from "../helpers/provider";
import Error from "../pages/Error";
import App from "../app";

// const App = lazy(() => import('../app'));
import Us from '../pages/Us'
import Wines from '../pages/Wines'
import Contact from '../pages/Contact'
import Admin from '../pages/Admin'
import Designs from '../pages/Designs'
import Loved from '../pages/Loved'
import Cart from '../pages/Cart'
import Design from '../pages/Design'





const designsAndTagsLoader = async ({params}:{params: {id?: number}}) => {
  console.log("start loader");
  // get route

  
  const results = await Promise.all([
    fetchPublicDesigns(params.id ? params.id : null),
    fetchTags()
  ])


  console.log("loader results");
  console.log(results);
  
  const [designs, tags] = results;
  console.log("designs");
  
  return { designs, tags };
};





export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: designsAndTagsLoader,
    errorElement: <Error />,
  },
  {
    path: "us",
    element: <Us />,
    errorElement: <Error />,
  },
  {
    path: "wines",
    element: <Wines />,
    errorElement: <Error />,
  },
  {
    path: "contact",
    element: <Contact />,
    errorElement: <Error />,
  },
  {
    path: "admin",
    element: <Admin />,
    errorElement: <Error />,
  },
  {
    path: "designs",
    loader: designsAndTagsLoader,
    element: <Designs />,
    errorElement: <Error />,
  },
  {
    path: "designs/:id",
    loader: designsAndTagsLoader,
    element: <Design/>,
    errorElement: <Error />,
  },
  {
    path: "loved",
    element: <Loved />,
    errorElement: <Error />,
  },
  {
    path: "cart",
    element: <Cart />,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <Error />,
    errorElement: <Error />,
  },
]);