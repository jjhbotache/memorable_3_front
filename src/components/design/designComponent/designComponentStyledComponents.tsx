import styled, { css } from "styled-components";
import { mdScreen } from "../../../constants/styleConstants";

export const DesignComponentStyledContainer = styled.div<{$styleBehavior: "grid" | "column"}>`
  display: flex;
  box-sizing: border-box;
  color: var(--primaryColor);
  
  

  ${props => props.$styleBehavior === "column" ? css`
    /* column */
    gap: .5em;
    background: #00000022;
    flex-wrap: wrap;
    overflow: hidden;
    height: 100%;
    min-height: 50vh;
    align-items: stretch;


    .rightSide {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1vw;
      box-sizing: border-box;
      .titleAndHeart{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .5em;
        .title {
          flex-basis: 90%;
          font-size: 2.5em;
        }
        .heart{
          flex-basis: 10%;
          font-size: 2.5em;
        }
      }
      .btns{
        margin-top: auto;
        margin-left: auto;
        /* font-size: large; */
      }

    }
    img{
      width: auto;
      height: 100%;

      object-fit: contain;
      margin: auto;
      overflow: hidden;

      max-width: 300px;
    }


  ` : css`
    /* grid */
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 48%;
    min-width: 200px;
    max-width: 250px;
    margin-bottom: 2em;

    .heart {
      z-index: 2;
      font-size: .9em;
      cursor: pointer;
      position: absolute;
      top: .4em;
      right: .4em;
    }

    img {
      width: 100%;
    }

    .title {
      padding: .2em .4em 0 0;
      margin-bottom: auto;
    }

    .btns {
      width: 100%;
      justify-content: space-evenly;
    }
  `}

  img {
    padding: .3em;
    border: 1px solid var(--primaryColor);
    border-radius: 1rem;
    box-sizing: border-box;
    aspect-ratio: 1/1;
    cursor: pointer;
  }

  .btns {
    display: flex;
    gap: .7vw;

    .addCart {
      position: relative;

      .addedIco {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(45%, -45%);
        font-size: .8em;
        color: var(--primaryColor);
      }
    }

    button {
      font-size: large;
      border: 1px solid var(--primaryColor);
      background: var(--primaryColor);
      color: var(--secondaryColor);
      border-radius: 1rem;
      padding: .3em .6em;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        background: var(--secondaryColor);
        color: var(--primaryColor);
        transform: scale(1.1);
        box-shadow: 0 0 5px 1px darkgrey;
      }

      &:active {
        transform: scale(.9);
        box-shadow: 0 0 5px 1px darkgray inset;
      }

      &.addCart {
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        @media screen and (width < ${mdScreen}px) {
          flex: unset;
          width: auto;

          span {
            display: none;
          }
        }
      }
    }
  }

  .title {
    font-size: xx-large;
    line-height: 1.2em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }

  .heart {
    background: var(--secondaryColor);
    border-radius: 50%;
    width:1.7em;
    height:1.7em;

    margin:.1em
  }
`;
