import styled from "styled-components";
import { mdScreen, primaryColor } from "../../../constants/styleConstants";

export const StyledWinesContainer = styled.div`
  width: 100%;
  max-width: 700px;
  @media screen and (width < ${mdScreen}px){
    box-shadow: unset;
    width: 95vw;
    box-sizing: border-box;
  }
  box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.75);
  padding: 1em 2em;
  box-sizing: border-box;
  

  color: ${primaryColor};

  display: flex;
  flex-direction: column;
  gap: 2em;

  h1{
    font-size: 6em;
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

    @media screen and (width < ${mdScreen}px){
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;
    }

    
   h1{
    font-family: 'HelloValentina';
    font-size: 4em;
    font-weight: 300;
    display: flex;
    align-items: center;
    line-height: .7em;
   }
   p{
    font-size: 1.2em;
    font-weight: 300;
   }
   .imgContainer{
    /* put it from the first row to the second */
    grid-column: 2/3;
    grid-row: 1/3;
    
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    border-radius: 1em;

    img{
      width: 80vw;
      max-width: 300px;
      border-radius: 1em;
    }
   }
  }
`;