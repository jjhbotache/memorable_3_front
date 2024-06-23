import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { fetchPublicDesigns, fetchTags } from "../helpers/provider";
import { Suspense } from "react";
import LoadingScreen from "../components/global/LoadingScreen";

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
  },
  {
    path: "us",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Us />
      </Suspense>
    ),
  },
  {
    path: "wines",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Wines />
      </Suspense>
    ),
  },
  {
    path: "contact",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Admin />
      </Suspense>
    ),
  },
  {
    path: "designs",
    loader: designsAndTagsLoader,
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Designs />
      </Suspense>
    ),
  },
  {
    path: "designs/:id",
    loader: designsAndTagsLoader,
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Design/>
      </Suspense>
    ),
  },
  {
    path: "loved",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Loved />
      </Suspense>
    ),
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Cart />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    ),
  },
]);