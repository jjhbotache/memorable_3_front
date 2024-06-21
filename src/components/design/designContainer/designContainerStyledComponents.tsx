import styled, { css } from "styled-components";
import { primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants";

interface DesignsContainerProps {
  $styleBehavior?: "grid" | "column";
}



export const DesignsStyledContainer = styled.div<DesignsContainerProps>`
  ${props => props.$styleBehavior === "column" ? 
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  `:
  css`
    display: flex;
    flex-wrap: wrap;
    padding: .2em .2em ;
    justify-content: space-evenly;
    `
  }



  gap: 1vw;
  height: 100%;
  border-radius: 1rem;
  box-shadow: 0 0 1rem -.2rem ${primaryColor};
  width: 95%;
  margin: 1rem auto;
  padding: 1vw;

  .foundDesigns{
    margin-right: auto;
    margin-top: .2rem;
    flex-basis: 100%;
  }

  .aiDesingsHeader{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: linear-gradient(
      180deg,
      transparent 0%,
      ${tertiaryColor}dd 25%,
      ${tertiaryColor}dd 75%,
      transparent 100%
    );
    padding: 1rem 0;
    margin: 1rem 0;
    position: relative;
    &::after{
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        ${secondaryColor} 0%,
        transparent 5%,
        transparent 95%,
        ${secondaryColor} 100%
      );
    }
  }
  .aiTitle{
    font-size: 1.3rem;
    width: 100%;
    text-align: center;
  }
`
