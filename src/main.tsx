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
import LoadingScreen from './components/global/LoadingScreen';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      theme="light"
      pauseOnFocusLoss={false}
      />
      <Provider store={store}>
        <RouterProvider 
          router={router}
          fallbackElement={<LoadingScreen/>}

        />
      </Provider>
  </>,
)

