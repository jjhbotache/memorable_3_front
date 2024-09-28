import styled from "styled-components";
import UsDescription from "../components/us/usDescription/UsDescription";
import UsSlider from "../components/us/usSlider/UsSlider";
import { mdScreen} from "../constants/styleConstants";
import HowSection from "../components/us/HowSection/HowSection";

export default function Us() {
  return(
    <UsDescriptionStyled>
      <div className="main">
        <UsSlider/>
        <UsDescription/>
      </div>
      <HowSection/>
    </UsDescriptionStyled>
  )
}

const UsDescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: var(--primaryColor);
  background-color: var(--background);
  .main{
    height: 100%;
    display: flex;
    border: .5em solid var(--tertiaryColor);
    border-right: none;
    border-left: none;


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