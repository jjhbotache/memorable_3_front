import styled from "styled-components";
import Navbar from "../components/global/navbar/Navbar";
import UsDescription from "../components/us/usDescription/UsDescription";
import UsSlider from "../components/us/usSlider/UsSlider";
import { mdScreen, primaryColor } from "../constants/styleConstants";

export default function Us() {
  return(
    <UsDescriptionStyled>
      <Navbar/>
      <div className="main">
        <UsSlider/>
        <UsDescription/>
      </div>
    </UsDescriptionStyled>
  )
};

const UsDescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${primaryColor};
  .main{
    height: 100%;
    display: flex;
    }
  @media screen and (width < ${mdScreen}px){
    .main{
      flex-direction: column-reverse;
      padding: 1em;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      text-align: center;
    }      
  }
`;