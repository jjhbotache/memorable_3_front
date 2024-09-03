import styled, { css, keyframes } from "styled-components";
import { primaryColor } from "../../../constants/styleConstants";

interface DesignsContainerProps {
  $styleBehavior?: "grid" | "column";
}

// create a keyframes animation

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const floating = keyframes`
  0%,100%{
    transform: translateY(0) ;
  }
  25% {
    transform: translateY(.3em) ;
  }
  75% {
    transform: translateY(-.3em) ;
  }
`;


export const DesignsStyledContainer = styled.div<DesignsContainerProps>`
  ${props => props.$styleBehavior === "column" ? 
  css` 
  /* column */
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    
  `:
  css`
  /* grid */
    display: flex;
    flex-wrap: wrap;
    padding: .2em .1em ;
    justify-content: space-evenly;
    `
  }



  gap: 1vw;
  flex-grow: 1;
  padding: 1em;

  border-radius: 1rem;
  box-shadow: 0 0 1rem -.2rem black;
  width: 95%;
  margin: 1rem auto;
  background-color: var(--secondaryColor);
  color: var(--primaryColor);
  box-sizing: border-box;

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
    gap: 1rem;
    background: var(--tertiaryColor);
    padding: 1rem 2em;
    text-align: center;
    margin: 1rem 0;
    position: relative;
    &::after{
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        var(--secondaryColor) 0%,
        transparent 5%,
        transparent 95%,
        var(--secondaryColor) 100%
      );
    }
  }
  .aiTitle{
    font-size: 1.3rem;
    width: 100%;
    text-align: center;
  }
  .takeToAiResults{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    z-index: 2;
    bottom: 2rem;
    background: var(--primaryColor);
    color: var(--secondaryColor);
    border: none;
    padding: .5rem 1rem;
    border-radius: 999rem;
    box-shadow: 0 0 1rem .2rem ${primaryColor};
    animation: ${bounce} 1.3s infinite;
    transition: .3s;
    cursor: pointer;
    &:hover{
      transform: scale(1.1);
      animation: ${floating} 2s infinite linear;
    }
    i,i::before,i::after{
      font-size: 1.2rem;
      margin:0;
      padding: 0;
      display: grid;
      place-items: center;
    }
  }
`