import { Outlet } from "react-router-dom";
import Navbar from "./components/global/navbar/Navbar";
import Footer from "./components/global/Footer";
import FloatingWhatsappBtn from "./components/global/FloatingWhatsappBtn";
import { useSelector } from "react-redux";
import LoadingScreen from "./components/global/LoadingScreen";

export default function Root() {
  const pageLoading = useSelector((state: any) => state.pageLoading);
  

  return pageLoading? <LoadingScreen/>:<>
    <Navbar/>
    <Outlet/>
    <Footer/>
    <FloatingWhatsappBtn/>
  </>
  
};
