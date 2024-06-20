import styled from "styled-components";
import { mdScreen, primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants";

export const StyledShowerManager = styled.div`
  display: flex;
  margin: 1em auto 2em auto;
  width: 98%;
  /* max-width: 95vw; */
  gap: clamp(1px , calc(1.5vw - .2em), 1em);
  font-family: "Fragmentcore";
  box-sizing: border-box;
  flex-wrap: wrap;
  .search{
    font-family: "Fragmentcore";
    display: flex;
    flex: 8;
    border: 1px solid ${primaryColor};
    border-radius: .3em;
    padding: .2em .5em ;
    height: 2.2em;
    font-size: medium;
    color: ${primaryColor};
    &:focus-visible{
      outline: 2px solid ${secondaryColor};
    }
  }
  .filter{
    display: flex;
    flex: 1;
    border-radius: .3em;
    position: relative;
    cursor: pointer;
    
    .divider{
      height: 1px;
      width: 100%;
      background: ${primaryColor};
      border: none;
    }

    summary{
      display: grid;
      place-items: center;
      text-align: center;
      height: 100%;
      position: relative;

      i{
        height: 2rem;
        width: 2rem;
        background: ${primaryColor};
        color: ${secondaryColor};
        border-radius: 25%;
        position: relative;
        span.badge{
          position: absolute;
          display: grid;
          place-items: center;
          top: 0;
          right: 0;
          transform: translate(50%,-50%);
          background: ${tertiaryColor};
          color: ${primaryColor};
          border-radius: 50%;
          font-size: .7em;
          width: 1.5em;
          height: 1.5em;
          font-weight: bold;
        }
      }

    }
    .floatingInfo{
      position: absolute;
      top: 110%;
      background: ${tertiaryColor};
      border-radius: .3em;
      border: 1px solid ${primaryColor};
      padding: .8em;
      max-height: 80vh;
      overflow-y: auto;
      width: 200%;
      max-width: 200px;
      z-index: 10;
      @media screen and (width < ${mdScreen}px){
        position: fixed;
        top: 28vh;
        height: 60vh !important;
        left: 50%;
        transform: translateX(-50%);

        
        height: 80vh;
      }

      .tagsContainer{
        display: flex;
        flex-direction: column;
      }
      button{
        background: ${primaryColor};
        color: ${secondaryColor};
        border: 1px solid ${primaryColor};
        border-radius: .3em;
        padding: .2em .5em;
        margin: .5em 0;
        cursor: pointer;
        transition: all .2s;
        &:hover{
          background: ${secondaryColor};
          color: ${primaryColor};
        }
      
      }
    }
  }
  .arragmentBtns{
    flex: 3 ;
    max-width: 100px;
  }
`