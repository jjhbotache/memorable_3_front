import styled from "styled-components";
import { primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants"

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
    max-width: 320px;
    height: 300px;
    flex-direction: column;
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
    overflow: hidden;
    img{
      border-radius: 1rem;
      border: 2px solid ${primaryColor};
      width: 100%;
      max-width: 160px;
      padding: .2rem;
      aspect-ratio: 1/1;
      margin: auto;
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
          font-size: 1.5rem;
          padding-bottom: .7rem;
          max-height: 1rem;
          overflow: hidden;
          white-space: nowrap;
          
          `:`
          font-size: 2rem;
          `}
          font-weight: 300;
          text-overflow: ellipsis;
        }
        .heart{
          font-size: 2rem;
          font-weight: 100;
          min-width: 4rem;
        }
      }
      .btns{
        display: flex;
        justify-content: end;
        width: 100%;
        gap: 1rem;
        button{
          ${props => props.styleBehavior === "grid" 
          ?`
          padding: .2rem .3rem;
          `:`
          padding: .5rem 1rem;
          `}
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