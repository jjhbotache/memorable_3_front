import styled from "styled-components";
import { mdScreen, primaryColor,  tertiaryColor } from "../../../constants/styleConstants";

const gridGapEms = .4;
export const CarouselContainer = styled.div`
  /* if the screen is smaller than md screen, dont show */
  display: none;
  @media (min-width: ${mdScreen}px){
    display: block;
  }

  height: 100%;
  background: ${tertiaryColor};
  width: 50%;
  overflow: hidden ;
  box-sizing: border-box;

  .rowsContainer{
    display: flex;
    flex-direction: column;
    gap: ${gridGapEms}em;
    width: 100%;
    max-height: 0px;
    transform: rotate(-30deg);
  }
  .row{
    &:nth-child(1){
      margin-top: -50%;
    }

    display: flex;
    gap: ${gridGapEms}em;
    img{
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: ${gridGapEms}em;
      border: 2px solid ${primaryColor};
      box-shadow: 0 0 .3em -.1em black;
    }

  }
`;