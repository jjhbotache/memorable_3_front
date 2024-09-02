import styled from "styled-components"
import { mdScreen } from "../../../constants/styleConstants";

export default function UsDescription() {
  return(
    <UsDescriptionStyled>
      <h1>Nosotros</h1>
      <p>
        Memorable es una empresa especializada en crear momentos únicos y significativos. Su enfoque radica en <strong>personalizar botellas de vino</strong>, convirtiéndolas en recuerdos inolvidables. <strong>Cada diseño es exclusivo</strong> y está pensado para capturar la esencia de momentos especiales. Imagina una botella con un mensaje personal, una fecha importante o un motivo que te haga sonreír cada vez que la veas. Es más que una simple botella: es un tesoro lleno de emociones y significado.
      </p>
    </UsDescriptionStyled>
  )
};


const UsDescriptionStyled = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--primaryColor);
  background-color: var(--background);
  width: 50%;
  min-width: 300px;
  box-sizing: border-box;
  height: auto;
  padding: 1em;

  @media screen and (width < ${mdScreen}px) {
    width: 90%;
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