import styled from "styled-components"
import { mdScreen, primaryColor, tertiaryColor } from "../../../constants/styleConstants";
import UsDescription from "../../us/usDescription/UsDescription";
import WinesContainer from "../../wines/winesContainer/WinesContainer";
import ContactForm from "../../contact/ContactForm";


export default function TagsPresentation() {
  const tags = [
    "Cumpleaños",
    "Boda",
    "Graduación",
    "Viaje",
    "Fiesta",
    "Reunión",
    "Aniversario",
    "Amor"
  ]
  return(
    <>
    <TagsDescription>
      <h1>¿Para que momento quieres tu botella memorable?</h1>
      <div className="tagsContainer">
        {
          tags.map(tag => (
            <div className="tag" key={tag}>
              <span>{tag}</span>
            </div>
          ))
          }
      </div>
      <div className="extraInfo">
        <div className="divider"/>
        <UsDescription/>
        <div className="divider"/>
        <WinesContainer/>
        <div className="divider"/>
        <ContactForm/>
      </div>
    </TagsDescription>  
    </>
  )
};


const TagsDescription = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1em;
  padding: 4em 0; 
  box-sizing: border-box;
  min-width: 50%;
  width: 550px;
  margin: 0;
  z-index: 2;
  box-shadow: -20px 0 50px rgba(0,0,0,.5);
  @media screen and (width < ${mdScreen}px){
    box-shadow: 0px 0 50px rgba(0,0,0,.5);
    
  }


  h1{
    font-size: 3em;
    font-weight: 300;
    color: ${primaryColor};
    text-align: center;
  }
  .tagsContainer{
    display: flex;
    justify-content: center;
    gap: 2em;
    flex-wrap: wrap;
    z-index: 2;
    padding-bottom: 2em;
  }
  .tag{
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${tertiaryColor};
    padding: .3em .5em;
    font-size: 1.2em;
    border-radius: 99999px;
    font-weight: 300;
    cursor: pointer;
    transition: .1s;

    &:hover{
      background: ${primaryColor};
      color: ${tertiaryColor};
      transform: scale(1.3);
    };
  }
  .extraInfo{
    display: none;
    @media screen and (width < ${mdScreen}px){
      display: flex;
      flex-direction: column;
      gap: 1em;
      align-items: center;
      text-align: center;
    }

    .divider{
      width: 95%;
      height: 1px;
      background: ${primaryColor};
    }
  }
`;