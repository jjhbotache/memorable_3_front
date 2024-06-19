import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";
import filterReducer from "./slices/filterReducer";



export default configureStore({
    reducer: {
      user: userReducer,
      filter: filterReducer,
    },
});  
