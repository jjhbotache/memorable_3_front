import styled from "styled-components"
import { mdScreen, primaryColor, secondaryColor } from "../constants/styleConstants"
import Navbar from "../components/global/navbar/Navbar"
import contactSvg from "../assets/svgs/contact us.svg"
import ContactForm from "../components/contact/ContactForm"

export default function Contact() {
  return(
    <StyledContact>
      <Navbar/>
      <div className="main">
        <img src={contactSvg} alt="contactSvg"/>
        <ContactForm/>
      </div>
    </StyledContact>
  )
};


const StyledContact = styled.div`
  background: ${secondaryColor};
  color: ${primaryColor};
  height: 100vh;
  display: flex;
  flex-direction: column;

  .main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    img{
      @media screen and (width < ${mdScreen}px){
        display: none;
      }
      margin: auto;
      flex-basis: 50%;
      max-width: 45vw;
    }
  }
`