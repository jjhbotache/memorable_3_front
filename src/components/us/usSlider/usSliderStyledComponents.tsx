import styled from "styled-components";
import { secondaryColor } from "../../../constants/styleConstants";

export const UsSliderStyled = styled.div`

  background: var(--tertiaryColor);
  width: clamp(150px, 50vw, 80vh);
  height: clamp(150px, 50vw, 80vh);
  aspect-ratio: 1/1;
  
  color: var(--secondaryColor);
  display: block;
  

  

  .imgContainer{
    background: var(--tertiaryColor);
    width: inherit;
    height: inherit;
    .swiper-slide{
      display: grid;
      place-items: center;
    }
    .img{
      width: 100%;
    }
  }

  .swiper-button-next,.swiper-button-prev{
    background: transparent;
    padding: .2rem;
    backdrop-filter: blur(0.01em);
    border: none;
    border-radius: 10%;
    font-size: 2rem;
    color: ${secondaryColor};
    opacity: 0.5;
    transition: all .1s ease-in-out;
    &:hover{
      opacity: 1;
      transform: scale(1.3);
      backdrop-filter: blur(5px);
      border: 1px solid ${secondaryColor};
    }
  }
`;