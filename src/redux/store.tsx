import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";



export default configureStore({
    reducer: {
      user: userReducer,
    },
});  
