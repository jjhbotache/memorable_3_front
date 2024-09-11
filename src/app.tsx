import { useEffect} from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userReducer";


export default function App() {
  const { designs , tags } = useLoaderData() as { designs: Desing[], tags: Tag[] };
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user);
  


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
    if (! user.google_sub) {
      console.log("no user, looking in ls");
      const lsUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (lsUser.google_sub) return
      fetch(API + "/user-login-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        data.user && dispatch(setUser(data.user))
        
        toast.success("Bienvenido de vuelta "+ (user as User).name.split(" ")[0] ,{
          pauseOnFocusLoss: false
        });
      })
    }else{
      localStorage.setItem("user", JSON.stringify(user));
    }

  }, []);

  


  return(
    <>
      <MainContainer >
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
  

  /* use them */
  color: var(--primaryColor);
  background: var(--background);
`;  