import { useEffect } from "react";
import { DEBUG, LOCAL_API, REAL_API } from "./constants/appConstants";
import { useDispatch } from "react-redux";
import Navbar from "./components/global/navbar/Navbar";
import { setUser } from "./redux/slices/userReducer";
import googleJsonConfig from "../googleClientSecret.json";

import { gapi } from "gapi-script";

export default function App() {

  const dispacher = useDispatch();

  const { client_id } = googleJsonConfig.web;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
      });
    }

    gapi.load('client:auth2', start);
  }, []);


  // function onSignInOrSignUp(response:GoogleLoginResponse) {
  //   const url = (DEBUG ? LOCAL_API : REAL_API) + "/user-login-signup";

  //   fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", },
  //     body: JSON.stringify({
  //       google_sub: response.profileObj.googleId,
  //       name: response.profileObj.name,
  //       email: response.profileObj.email,
  //       phone: null,
  //       image_url: response.profileObj.imageUrl,
  //     }),
  //   })

  //   dispacher(setUser({
  //     google_sub: response.profileObj.googleId,
  //     name: response.profileObj.name,
  //     email: response.profileObj.email,
  //     phone: null,
  //     image_url: response.profileObj.imageUrl,
  //   }));
  // }


  return(
    <>
    <Navbar/>
    

    
    </>
  )
};
