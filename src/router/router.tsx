import { createBrowserRouter } from "react-router-dom";
import { fetchPublicDesigns, fetchTags } from "../helpers/provider";
import Error from "../pages/Error";
import App from "../app";

import Us from '../pages/Us'
import Wines from '../pages/Wines'
import Contact from '../pages/Contact'
import Admin from '../pages/Admin'
import Designs from '../pages/Designs'
import Loved from '../pages/Loved'
import Cart from '../pages/Cart'
import Design from '../pages/Design'
import { setPageLoading } from "../redux/slices/pageLoadingReducer";
import store from "../redux/store";
import Root from "../Root";







const designsAndTagsLoader = async ({params}:{params: {id?: number}}) : Promise<any> => {
  store.dispatch(setPageLoading(true));

  


  try{
    
    const results = await Promise.all([
      fetchPublicDesigns(params.id ? params.id : null),
      fetchTags()
    ])
  
    
    const [designs, tags] = results;

    // make a promise that resolves after 5 seconds to test loading screen

    return { designs, tags };
  }  catch (error) {
    // wait 5 secs and use recursion to try again
    console.log("error loading designs and tags");
    console.log(error);
    await new Promise(resolve => setTimeout(resolve, 5000));
    return designsAndTagsLoader({params});
  } finally{
    store.dispatch(setPageLoading(false));
  }
  
};





export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path: "",
        element: <App />,
        loader: designsAndTagsLoader,
      },
      {
        path: "us",
        element: <Us />,
      },
      {
        path: "wines",
        element: <Wines />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "designs",
        loader: designsAndTagsLoader,
        element: <Designs />,
      },
      {
        path: "designs/:id",
        loader: designsAndTagsLoader,
        element: <Design/>,
      },
      {
        path: "loved",
        element: <Loved />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
  
]);