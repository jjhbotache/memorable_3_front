import { useEffect} from "react";
import Navbar from "./components/global/navbar/Navbar";
import { gapi } from "gapi-script";
import { API, googleClientId } from "./constants/appConstants";
import memorableIcon from "./assets/svgs/memorableIcon.svg";
import Carousel from "./components/landingPage/carousel/Carousel";
import TagsPresentation from "./components/landingPage/tagsPresentation/TagsPresentation";
import styled from "styled-components";
import { toast } from "react-toastify";
import User from "./interfaces/userInterface";
import { useLoaderData } from "react-router-dom";
import Desing from "./interfaces/designInterface";
import Tag from "./interfaces/tagInterface";

export default function App() {
  const { designs , tags } = useLoaderData() as { designs: Desing[], tags: Tag[] };
  


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
    if(user?.google_sub){
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
        toast.success("Bienvenido de vuelta "+ (user as User).name.split(" ")[0] ,{
          pauseOnFocusLoss: false
        });
      })
    }
  }, []);




  return(
    <>
      <Navbar/>
      <MainContainer>
        <Carousel preloadedImgs={designs.map(design => design.img_url)} />
        <TagsPresentation preloadedTags={tags.slice(0, 7)} />
      </MainContainer>
    </>
  )
};

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;  