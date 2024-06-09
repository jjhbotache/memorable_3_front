import { useEffect } from "react";
import Navbar from "./components/global/navbar/Navbar";
import { gapi } from "gapi-script";
import { googleClientId } from "./constants/appConstants";

export default function App() {



  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientId,
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
      });
    }

    gapi.load('client:auth2', start);
  }, []);




  return(
    <>
    <Navbar/>
    
    </>
  )
};
