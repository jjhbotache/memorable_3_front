import styled, { css } from "styled-components";
import { primaryColor } from "../../../constants/styleConstants";

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
`
