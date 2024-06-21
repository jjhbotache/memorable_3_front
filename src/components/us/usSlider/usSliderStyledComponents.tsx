import styled from "styled-components";
import { mdScreen, secondaryColor, tertiaryColor } from "../../../constants/styleConstants";

export const UsSliderStyled = styled.div`
  /* only show if the screen is bigger than mdScreen */
  @media screen and (width < ${mdScreen}px){
    width: 100%;
    max-width: unset;
    height: 50vh;
  }

  background: ${tertiaryColor};
  height: 100%;
  max-height: 87vh;
  width: 50%;
  max-width: 50vw;
  color: ${secondaryColor};

  .imgContainer{
    background: ${tertiaryColor};
    height: 100%;
    width: 100%;
    max-height: 88vh; 
    .swiper-slide{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      min-height: inherit;
      }
      .img{
        height: 100%;
        width: 100%;
        max-height: inherit;
      }
  }

  .swiper-button-next,.swiper-button-prev{
    background: transparent;
    border: none;
    font-size: 2rem;
    color: ${secondaryColor};
    transition: all .1s ease-in-out;
    &:hover{
      transform: scale(1.3);
    }
  }
`;