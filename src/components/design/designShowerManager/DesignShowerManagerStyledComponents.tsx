import styled from "styled-components";
import { primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants";

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
    flex: 2;
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

      i{
        height: 2rem;
        width: 2rem;
        background: ${primaryColor};
        color: ${secondaryColor};
        border-radius: 25%;
      }

    }
    .floatingInfo{
      position: absolute;
      top: 110%;
      background: ${tertiaryColor};
      border-radius: .3em;
      border: 1px solid ${primaryColor};
      padding: .5em;
      width: 100%;
      z-index: 1;

      .tagsContainer{
        display: flex;
        flex-direction: column;
      }
    }
  }
  .arragmentBtns{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex: 1;
    i{
      color: ${primaryColor};
      height: 2em;
      width: 2em;
      border-radius: 25%;
      opacity: .6;
      cursor: pointer;
      transition: all .2s;
      &::before, &::after{
        height: 2em;
        width: 2em;
        display: grid;
      
        place-items: center;
      }
      &.active{
        opacity: 1;
        color: ${secondaryColor};
        background: ${primaryColor};
      }
    }

  }
`