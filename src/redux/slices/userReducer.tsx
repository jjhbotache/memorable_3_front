import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "user",
    initialState: {
      userName: null,
      password: null,
      data: null
    },
    reducers: {
      setUser: (state, action) => {
        console.log(action.payload);
        state.userName = action.payload.userName;
        state.password = action.payload.password;
        state.data = action.payload.data;
      },
    },
  })


export default userReducer.reducer;
// export actions
export const { setUser } = userReducer.actions;
