import styled from "styled-components";
import { mdScreen, primaryColor, tertiaryColor } from "../../../constants/styleConstants";

export const StyledWinesContainer = styled.div`
  width: 100%;
  max-width: 700px;
  @media screen and (width < ${mdScreen}px){
    box-shadow: unset;
    width: 100%;
    box-sizing: border-box;
  }
  box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.75);
  padding: 1em ;
  box-sizing: border-box;
  

  color: ${primaryColor};

  display: flex;
  flex-direction: column;
  gap: 2em;

  .pageTitle{
    font-size: 4em;
    font-family: "HelloValentina";
    font-weight: 300;
    text-align: center;
  }

  .wineRow {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin: 3em 0;
    height: auto;
    padding-left: 1em;
    background: ${tertiaryColor};
    border-radius: 0 2em 2em 0;

    @media screen and (width < ${mdScreen}px){
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;
      padding: 1em .8em;
      border-radius: 2em;
    }

    
    h1{
      font-family: 'HelloValentina';
      font-size: 3.5em;
      font-weight: 300;
      display: flex;
      align-items: center;
      line-height: .7em;
      margin-top: 25%;
      margin-bottom: 5%;
    }
    small{
      font-size: clamp(1.1em, 2.5vw, 1.6em);
      color: ${primaryColor};
      font-weight: 300;
      margin-left: 5%;
      @media screen and (width < ${mdScreen}px){
        margin-left: 0;
      }
    }
    p{
      max-width: 90%;
      font-size: 1.2em;
      font-weight:500;
      text-align: justify;
      margin: auto;
      line-height: 1.2em;
      padding: .8em;
      border-radius: calc(2em - 1em );
      background: rgba(255,255,255,0.75);

      @media screen and (width > ${mdScreen}px){
        margin: unset;
        margin-right: auto;
        background-color: unset;
      }
    }
    .imgContainer{
      /* put it from the first row to the second */
      grid-column: 2/3;
      grid-row: 1/3;
      
      overflow: hidden;
      display: flex;
      justify-content: end;
      align-items: center;
      height: auto;
      border-radius: 1em;
      width: 100%;
      object-fit: cover;
      @media screen and (width < ${mdScreen}px){
        justify-content: center;
      }

      img{
        width: 80vw;
        max-width: 300px;
        border-radius: 1em;
        border-left: .5em solid ${primaryColor};
        @media screen and (width < ${mdScreen}px){
          border: .2em solid ${primaryColor};
        }
      }
    }
  }
`;