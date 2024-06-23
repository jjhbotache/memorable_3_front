import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { fetchPublicDesigns, fetchTags } from "../helpers/provider";
import { Suspense } from "react";
import LoadingScreen from "../components/global/LoadingScreen";
import Error from "../pages/Error";

const App = lazy(() => import('../app'));
const Us = lazy(() => import('../pages/Us'));
const Wines = lazy(() => import('../pages/Wines'));
const Contact = lazy(() => import('../pages/Contact'));
const Admin = lazy(() => import('../pages/Admin'));
const Designs = lazy(() => import('../pages/Designs'));
const Loved = lazy(() => import('../pages/Loved'));
const Cart = lazy(() => import('../pages/Cart'));
const Design = lazy(() => import('../pages/Design'));





const designsAndTagsLoader = async ({params}:{params: {id?: number}}) => {
  // get route

  const results = await Promise.all([
    fetchPublicDesigns(
      params.id ? params.id : null
    ),
    fetchTags()
  ])
  console.log("results");
  console.log(results);
  
  const [designs, tags] = results;
  return { designs, tags };
};





export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    ),
    loader: designsAndTagsLoader,
    errorElement: <Error />,
  },
  {
    path: "us",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Us />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "wines",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Wines />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "contact",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Contact />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Admin />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "designs",
    loader: designsAndTagsLoader,
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Designs />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "designs/:id",
    loader: designsAndTagsLoader,
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Design/>
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "loved",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Loved />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Cart />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Error />
      </Suspense>
    ),
    errorElement: <Error />,
  },
]);