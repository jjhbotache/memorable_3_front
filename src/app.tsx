import { useEffect, useRef } from "react";
import Navbar from "./components/global/navbar/Navbar";
import { gapi } from "gapi-script";
import { API, googleClientId } from "./constants/appConstants";
import memorableIcon from "./assets/svgs/memorableIcon.svg";
import Carousel from "./components/landingPage/carousel/Carousel";
import TagsPresentation from "./components/landingPage/tagsPresentation/TagsPresentation";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function App() {


  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    link.href = memorableIcon;
    function start() {
      gapi.client.init({
        clientId: googleClientId,
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
      });
    }

    gapi.load('client:auth2', start);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if(user){
      fetch(API + "/user-login-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        toast.success("Bienvenido de vuelta " + data.user.name);
      })
    }
  }, []);




  return(
    <>
      <Navbar/>
      <MainContainer>
        <Carousel/>
        <TagsPresentation/>
      </MainContainer>
    </>
  )
};

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;  