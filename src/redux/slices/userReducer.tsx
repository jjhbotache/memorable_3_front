import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "user",
    initialState: {
      google_sub: null,
      name: null,
      email: null,
      phone: null,
      image_url: null
    },
    reducers: {
      setUser: (state, action) => {
        state.google_sub = action.payload.google_sub;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.image_url = action.payload.image_url;        
      },
    },
  })


export default userReducer.reducer;
// export actions
export const { setUser } = userReducer.actions;
