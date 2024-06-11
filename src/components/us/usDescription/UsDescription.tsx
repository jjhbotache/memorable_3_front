import styled from "styled-components"
import { mdScreen, primaryColor } from "../../../constants/styleConstants";

export default function UsDescription() {
  return(
    <UsDescriptionStyled>
      <h1>Nosotros</h1>
      <p>Memorable es una empresa especializada en crear momentos únicos y significativos. Su enfoque radica en personalizar botellas de vidrio, convirtiéndolas en recuerdos inolvidables. Cada diseño es exclusivo y está pensado para capturar la esencia de momentos especiales. Imagina una botella con un mensaje personal, una fecha importante o un motivo que te haga sonreír cada vez que la veas. Es más que una simple botella; es un tesoro lleno de emociones y significado.</p>
    </UsDescriptionStyled>
  )
};


const UsDescriptionStyled = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${primaryColor};
  width: 50%;
  min-width: 300px;
  box-sizing: border-box;
  height: auto;
  padding: 1em;

  @media screen and (width < ${mdScreen}px) {
    width: 100%;
  }
  h1{
    font-family: HelloValentina;
    font-size: 5em;
    font-weight: 300;
  }
  p{
    font-size: larger;
  }
`;