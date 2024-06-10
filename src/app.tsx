import { useEffect } from "react";
import Navbar from "./components/global/navbar/Navbar";
import { gapi } from "gapi-script";
import { googleClientId } from "./constants/appConstants";
import memorableIcon from "./assets/svgs/memorableIcon.svg";
import Carousel from "./components/landingPage/carousel/Carousel";
import TagsPresentation from "./components/landingPage/tagsPresentation/TagsPresentation";
import styled from "styled-components";

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