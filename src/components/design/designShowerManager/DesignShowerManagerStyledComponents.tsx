import styled, { keyframes } from "styled-components";
import { mdScreen, primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants";

const infoDeployment = keyframes`
  from{
    transform: translateY(-2em);
    height: 0;
  }
  to{
    transform: translateY(0);
    height: 100vh;
  }
`

export const StyledShowerManager = styled.div`
  display: flex;
  margin: 1em auto 2em auto;
  width: 95%;
  /* max-width: 95vw; */
  gap: clamp(.5em , calc(1.5vw - .2em), 1em);
  font-family: "Fragmentcore";
  box-sizing: border-box;
  flex-wrap: wrap;
  .search{
    font-family: "Fragmentcore";
    display: flex;
    flex: 8;
    border: 1px solid var(--primaryColor);
    border-radius: .3em;
    padding: .2em .5em ;
    height: 2.2em;
    font-size: medium;
    color: ${primaryColor};
    background: ${secondaryColor};
    &:focus-visible{
      outline: 2px solid ${secondaryColor};
    }
    @media screen and (width < ${mdScreen}px){
      flex: unset;
      width: 100%;
    }
  }
  .filter{
    display: flex;
    flex: 1;
    border-radius: .3em;
    position: relative;
    cursor: pointer;
    color: var(--secondaryColor);
    @media screen and (width < ${mdScreen}px){
      flex: unset;
      width: 50%;
    }
    
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
      display: none;
      height: 0;
      
    }
    &[open] .floatingInfo{
      display: block;
      position: absolute;
      top: 110%;
      left: 5%;
      background: ${tertiaryColor};
      border-radius: .3em;
      border: 1px solid ${primaryColor};
      padding: .8em;
      height: auto;
      max-height: 50vh;
      width: clamp(200px,200%,80vw);
      max-width: 150px;
      z-index: 5;

      /* hide the scroll bar */
      overflow: auto;



      &::-webkit-scrollbar{
        display: none;
      }
        
    
      

      /* add animation to reproduce once */
      animation: ${infoDeployment} .5s forwards;

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
    @media screen and (width < ${mdScreen}px){
      flex: unset;
      width: 100%;
    }
  }
`