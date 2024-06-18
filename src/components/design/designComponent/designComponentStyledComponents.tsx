import styled, { css } from "styled-components";
import { mdScreen, primaryColor, tertiaryColor } from "../../../constants/styleConstants";

export const DesignComponentStyledContainer = styled.div<{styleBehavior:"grid" | "column"}>`

  /* ------------------------------------------------------------------------------------ */
  ${props => props.styleBehavior === "column" ? 
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 95vw;
    height: 22vh;
    padding: .2em;
    box-sizing: border-box;
    img{
      height: 100%;
    }
    .rightSide{
      display: flex;
      flex-direction: column;
      font-size: 2em;
      width: 100%;
      height: inherit;
      max-height: 100%;
      padding: clamp(1px, calc(2vh - 1vh), 2rem) 1vw;
      box-sizing: border-box;
      overflow: hidden;
      .titleAndHeart{
        display: flex;
        height: 100%;
        align-items: start;
        .title{
          flex: 1;
          padding-top: .3em;
        }
        .heart{
          flex-basis: 2em;
          width: .5em;
          aspect-ratio: 1/1;
          font-size: clamp(.3rem, 5vw, 2rem);
          margin-left: auto;
          cursor: pointer;
        }
      }
      .btns{
        justify-content: end;
        button{
          flex: 1;
          max-width: clamp(5em, 20vw, 10em);
          font-size: .4em;
          border-radius: 1rem;
          padding: .3em;
          box-sizing: border-box;
        }
        
      }


    }
  `:
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 47vw;
    max-width: 200px;
    margin-bottom: 2em;
    .heart{
      z-index: 5;
      font-size: 1.5em;
      cursor: pointer;
      position: absolute;
      top: .3em;
      right: .3em;
    }
    img{
      width: 100%;
    }
    .title{
      padding: .2em .4em 0 0;
      margin-bottom:.7em ;
    }
    .btns{
      width: 100%;
      justify-content: space-evenly;
    }
  `}

  /* ------------------------------------------------------------------------------------ */
  
  box-sizing: border-box;
  color : ${primaryColor};
  img{
    box-sizing: border-box;
    padding: .3em;
    border-radius: 1rem;
    border: 2px solid ${primaryColor};
    aspect-ratio: 1/1;
  }
  .btns{
    display: flex;
    gap: .7vw;
    button{
      border: 1px solid ${primaryColor};
      background: ${tertiaryColor};
      color: ${primaryColor};
      border-radius: 1rem;
      cursor: pointer;
      transition: all .2s;
  
      &:hover{
        background: ${primaryColor};
        color: ${tertiaryColor};
      }
  
      &.addCart{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background:  ${tertiaryColor};
        @media screen and (width < ${mdScreen}px) {
          flex: unset;
          width: auto;
          padding-left: 1em;
          padding-right: 1em;
          span{ display: none; }
        }
      }
    }
  }
  .title{
    font-size: clamp(.5rem, 8vw, 2rem);
    line-height: .9em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;