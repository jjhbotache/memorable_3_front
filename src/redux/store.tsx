import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";
import filterReducer from "./slices/filterReducer";
import pageLoadingReducer from "./slices/pageLoadingReducer";
import themeSlice from "./slices/themeSlice";



export default configureStore({
    reducer: {
      user: userReducer,
      filter: filterReducer,
      pageLoading: pageLoadingReducer,
      theme: themeSlice,
    },
});  
