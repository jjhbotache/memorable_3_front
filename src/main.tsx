import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./redux/store"
import './main.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './router/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="light"
      pauseOnFocusLoss={false}
      />
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
      <ToastContainer />
  </>,
)
