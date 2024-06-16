import styled from "styled-components";
import { mdScreen, primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants"

interface designsContainerProps {
  styleBehavior?: "grid" | "column";
}
export const DesignsStyledContainer = styled.div<designsContainerProps>`

  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem;
  background: ${secondaryColor};
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0.5rem ${primaryColor};
  width: 100%;
  max-width: 95vw;
  margin: 1rem auto;
  box-sizing: border-box;
  ${props => props.styleBehavior === "grid" 
    ?`
    justify-content: space-evenly;
    `:`
    `}

  .design{
    ${props => props.styleBehavior === "grid" 
    ?`
    max-width: 200px;
    flex-direction: column;
    position: relative;
    `:`
    flex-basis: 100%;
    `}
    display: flex;
    flex-basis: 100%;
    width: 100%;
    border-radius: 1rem;
    padding: .5rem;
    gap: 2vw;
    color: ${primaryColor};
    box-sizing: border-box;
    img{
      ${props => props.styleBehavior === "grid" 
      ?`
      `:`
      max-width: 160px;
      `}
      width: 100%;
      border-radius: 1rem;
      border: 2px solid ${primaryColor};
      padding: .2rem;
      aspect-ratio: 1/1;
      margin: auto;
      box-sizing: border-box;
    }
    .rightSide{
      display: flex;
      flex-direction: column;
      height: inherit;
      width: 100%;
      .text{
        display: flex;
        justify-content: space-between;
        align-items: start;
        flex-basis: 100%;
        h1{ 
          ${props => props.styleBehavior === "grid" 
          ?`
          font-size: 1.2rem;
          padding-bottom: .7rem;
          max-height: 1rem;
          overflow: hidden;
          white-space: nowrap;
          text-decoration: underline;
          cursor: pointer;
          text-align: center;
          width: 100%;
          `:`
          font-size: 2rem;
          `}
          font-weight: 300;
          text-overflow: ellipsis;
        }
        .helpText{
          display: none; 
          text-align: center;
          padding: .5rem;
          border-radius: 1rem;
          opacity: 0;
          transition: all .3s;
        }
        h1:hover + .helpText,
        h1:active + .helpText{
          position: absolute;
          display: block;
          background: ${primaryColor};
          color: ${secondaryColor};
          bottom: -5%;
          left: 0;
          width: 100%;
          opacity: 1;
        }
        .heart{
          ${props => props.styleBehavior === "grid" 
          ?`
          position: absolute;
          right: 0;
          top: .7em;
          font-size: 1.5rem;
          `:`
          font-size: 2rem;
          `}
          font-weight: 100;
          min-width: 4rem;
        }
      }
      .btns{
        ${props => props.styleBehavior === "grid" 
        ?`
        justify-content: space-evenly;
        `:`
        justify-content: end;
        `}
        display: flex;
        width: 100%;
        gap: 1rem;
        button{
          ${props => props.styleBehavior === "grid" 
          ?`
          padding: .2rem .3rem;
          `:`
          padding: .5rem 1rem;
          `}

          @media screen and (width < ${mdScreen}px) {
            .text{display: none;}
          }

          display: flex;
          justify-content: center;
          align-items: center;
          gap: .2rem;

          border-radius: 999rem;
          background: ${primaryColor};
          color: ${secondaryColor};
          font-size: 1.2rem;
          font-weight: 100;
          font-family:"Fragmentcore";
          border: none;
          cursor: pointer;
          transition: all .1s;
          &:first-child{
            background: ${tertiaryColor};
            color: ${primaryColor};
          }
          &:hover{
            background: ${secondaryColor};
            color: ${primaryColor};
            box-sizing: border-box;
            box-shadow: 0 0 .3rem 0.1rem ${primaryColor};
            font-weight: 500;
          }
        }
      }
    }

  }
`