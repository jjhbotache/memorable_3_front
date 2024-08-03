import styled from "styled-components";
import { mdScreen, primaryColor,  tertiaryColor } from "../../../constants/styleConstants";

const gridGapEms = .4;
export const CarouselContainer = styled.div`
  /* if the screen is smaller than md screen, dont show */
  @media screen and (width > ${mdScreen}px){
    display: block;
  }
  @media screen and (width < ${mdScreen}px){
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .2;
    &::after{
      content: '';
      position: absolute;
      z-index: 2;
      top: 80%;
      left: 0;
      width: 100%;
      height: 20vh;
      background: linear-gradient(
        180deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,1) 100%
      );
      opacity: 1;
    }
  }


  height: inherit;
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
      margin-top: -25%;
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