import { Outlet } from "react-router-dom";
import Navbar from "./components/global/navbar/Navbar";
import Footer from "./components/global/Footer";
import FloatingWhatsappBtn from "./components/global/FloatingWhatsappBtn";
import { useSelector } from "react-redux";
import LoadingScreen from "./components/global/LoadingScreen";
import styled from 'styled-components';
import { darkBackground, darkPrimaryColor, darkSecondaryColor, darkTertiaryColor, primaryColor, secondaryColor, tertiaryColor } from './constants/styleConstants';
import { Analytics } from "@vercel/analytics/react"


export default function Root() {
  const pageLoading = useSelector((state: any) => state.pageLoading);
  const theme = useSelector((state: any) => state.theme);
  
  const GlobalStylesContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    --primaryColor: ${theme === "dark" ? darkPrimaryColor : primaryColor};
    --secondaryColor: ${theme === "dark" ? darkSecondaryColor : secondaryColor};
    --tertiaryColor: ${theme === "dark" ? darkTertiaryColor : tertiaryColor};
    --background: ${theme === "dark" ? darkBackground : secondaryColor};
  `;

  return pageLoading? <LoadingScreen/>:<GlobalStylesContainer>
    <Navbar/>
    <Outlet/>
    <Footer/>
    <FloatingWhatsappBtn/>
    <Analytics/>
  </GlobalStylesContainer>
  
}
