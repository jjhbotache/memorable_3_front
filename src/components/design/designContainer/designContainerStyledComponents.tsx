import styled, { css } from "styled-components";
import { primaryColor } from "../../../constants/styleConstants";

interface DesignsContainerProps {
  styleBehavior?: "grid" | "column";
}

// export const DesignsStyledContainer = styled.div<DesignsContainerProps>`
//   display: flex;
//   flex-wrap: wrap;
//   padding: 1rem;
//   background: ${secondaryColor};
//   border-radius: 1rem;
//   box-shadow: 0 0 1rem 0.5rem ${primaryColor};
//   width: 100%;
//   max-width: 95vw;
//   margin: 1rem auto;
//   box-sizing: border-box;
//   justify-content: ${props => (props.styleBehavior === "grid" ? "space-evenly" : "flex-start")};
//   gap: ${props => (props.styleBehavior === "grid" ? ".5rem" : "2rem")};

//   .design {
//     display: flex;
//     flex-basis: 100%;
//     width: 100%;
//     max-width: 95vw;
//     border-radius: 1rem;
//     padding: .5rem;
//     gap: 2vw;
//     color: ${primaryColor};
//     box-sizing: border-box;

//     img {
//       height: ${props => (props.styleBehavior === "grid" ? "100%" : "auto")};
//       border-radius: 1rem;
//       border: 2px solid ${primaryColor};
//       padding: .2rem;
//       aspect-ratio: 1/1;
//       box-sizing: border-box;
//     }

//     .rightSide {
//       display: flex;
//       flex-direction: column;
//       height: 100%;
//       width: 100%;
//       box-sizing: border-box;

//       .text {
//         display: flex;
//         justify-content: space-between;
//         align-items: start;
//         flex-basis: 100%;
//         max-height: 80%;

//         h1 {
//           font-size: ${props => (props.styleBehavior === "grid" ? "1.2rem" : "1.4rem")};
//           padding-bottom: .7rem;
//           max-height: ${props => (props.styleBehavior === "grid" ? "1rem" : "80%")};
//           overflow: hidden;
//           text-decoration: underline;
//           cursor: pointer;
//           text-align: center;
//           width: 100%;
//           white-space: ${props => (props.styleBehavior === "grid" ? "nowrap" : "normal")};
//           font-weight: 300;
//           text-overflow: ellipsis;
//         }

//         .helpText {
//           display: none;
//           text-align: center;
//           padding: .5rem;
//           border-radius: 1rem;
//           opacity: 0;
//           transition: all .3s;
//         }

//         h1:hover + .helpText,
//         h1:active + .helpText {
//           position: absolute;
//           display: block;
//           background: ${primaryColor};
//           color: ${secondaryColor};
//           bottom: -5%;
//           left: 0;
//           width: 100%;
//           opacity: 1;
//           max-width: 90vw;
//         }

//         .heart {
//           font-size: ${props => (props.styleBehavior === "grid" ? "1.5rem" : "2rem")};
//           font-weight: 100;
//           min-width: 4rem;
//         }
//       }

//       .btns {
//         display: flex;
//         width: 100%;
//         gap: 1rem;
//         justify-content: ${props => (props.styleBehavior === "grid" ? "space-evenly" : "flex-end")};

//         button {
//           padding: ${props => (props.styleBehavior === "grid" ? ".2rem .3rem" : ".5rem 1rem")};

//           .text {
//             @media screen and (max-width: ${mdScreen}px) {
//               display: none;
//             }
//             display: ${props => (props.styleBehavior === "grid" ? "none" : "flex")};
//           }

//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: .2rem;
//           padding: .3rem .5rem;
//           box-sizing: border-box;
//           border-radius: .3rem;
//           background: ${primaryColor};
//           color: ${secondaryColor};
//           font-size: 1.2rem;
//           font-weight: 100;
//           font-family: "Fragmentcore";
//           border: none;
//           cursor: pointer;
//           transition: all .1s;

//           &:first-child {
//             background: ${tertiaryColor};
//             color: ${primaryColor};
//           }

//           &:hover {
//             background: ${secondaryColor};
//             color: ${primaryColor};
//             box-sizing: border-box;
//             box-shadow: 0 0 .3rem 0.1rem ${primaryColor};
//             font-weight: 500;
//           }
//         }
//       }
//     }
//   }
// `;


export const DesignsStyledContainer = styled.div<DesignsContainerProps>`
  ${props => props.styleBehavior === "column" ? 
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `:
  css`
    display: flex;
    flex-wrap: wrap;
    padding: .2em .2em ;
    justify-content: space-evenly;
    `
  }



  gap: 1vw;
  height: 100%;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0.5rem ${primaryColor};
  width: 95%;
  margin: 1rem auto;
  

`
