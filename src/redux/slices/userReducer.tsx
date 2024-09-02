import { createSlice } from "@reduxjs/toolkit";

function getUserFromLS() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return {
    google_sub: "",
    name: "",
    email: "",
    phone: "",
    img_url: "",
  };
}

const userReducer = createSlice({
    name: "user",
    initialState: getUserFromLS(),
    reducers: {
      setUser: (state, action) => {
        let newUser = action.payload;
        console.log("setting user to ", newUser);
        if(newUser.user) {
          newUser = newUser.user
          console.warn("catched error");
          
        }

        state.google_sub = newUser.google_sub;
        state.name = newUser.name;
        state.email = newUser.email;
        state.phone = newUser.phone;
        state.img_url = newUser.img_url;  
        console.log("updated to ", newUser);
        
      },
    },
  })


export default userReducer.reducer;
// export actions
export const { setUser } = userReducer.actions;
