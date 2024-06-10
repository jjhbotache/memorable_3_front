import styled from "styled-components"
import { primaryColor, tertiaryColor } from "../../../constants/styleConstants";


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
    <TagsDescription>
      <h1>¿Para que momento quieres tu botella memorable?</h1>
      <div className="tagsContainer">
        {
          tags.map(tag => (
            <div className="tag">
              <span>{tag}</span>
            </div>
          ))
        }
      </div>
    </TagsDescription>  
  )
};


const TagsDescription = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1em;
  margin-top: 2em;
  padding: 1em;
  box-sizing: border-box;
  min-width: 50%;
  width: 550px;
  margin: 0;

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
`;