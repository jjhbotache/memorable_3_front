import { useEffect, useState } from "react";
import { DEBUG, LOCAL_API, REAL_API } from "./constants/appConstants";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/global/navbar/Navbar";
import { setUser } from "./redux/slices/userReducer";
import googleJsonConfig from "../googleClientSecret.json";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { gapi } from "gapi-script";

export default function App() {

  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: any) => state.user);
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


  function onSignInOrSignUp(response:GoogleLoginResponse) {
    const url = (DEBUG ? LOCAL_API : REAL_API) + "/user-login-signup";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        google_sub: response.profileObj.googleId,
        name: response.profileObj.name,
        email: response.profileObj.email,
        phone: null,
        image_url: response.profileObj.imageUrl,
      }),
    })

    dispacher(setUser({
      google_sub: response.profileObj.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
      phone: null,
      image_url: response.profileObj.imageUrl,
    }));
  }


  return(
    <>
    <Navbar/>
    <h1> Sing in </h1>
    {error && <p>{error}</p>}
    <GoogleLogin
      clientId={client_id}
      buttonText="Google Login"
      onSuccess={(response) => {
        if (response as GoogleLoginResponse) {onSignInOrSignUp(response as GoogleLoginResponse)} else console.log(response);
      }}
      onFailure={(response) => console.log(response)}
      cookiePolicy={'single_host_origin'}
    />
    </>
  )
};
