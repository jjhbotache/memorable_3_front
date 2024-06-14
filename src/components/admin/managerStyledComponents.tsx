import styled from "styled-components";
import { primaryColor, secondaryColor, tertiaryColor } from "../../constants/styleConstants";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  border-radius: 5px;
  max-width: 600px;
  width: 100%;
  background: ${secondaryColor};
  input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid black;
  }
  button {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid black;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  
`

export const AddDropdown = styled.details`
  background-color: ${tertiaryColor};
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  width: 90%;
  box-sizing: border-box;
  summary {
    cursor: pointer;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary::marker {
    display: none;
  }
`

export const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 1rem;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  border-radius: 5px;
  background: ${secondaryColor};
  min-height: 50px;
  max-width: 600px;
  width: 80%;
  box-sizing: border-box;


  .row{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid ${primaryColor};
    color: ${primaryColor};
    border-radius: 5px;
    background: ${tertiaryColor};
    img{
      width: 100%;
      height: 100%;
      max-width: 200px;
      max-height: 200px;
      border-radius: 1em;
    }
    p{
      margin: 0;
    }
    .btns{
      display: flex;
      /* for the first btn, the right corners without a border radious */
      button:first-child{
        border-radius: 1em 0 0 1em;
        }
      button:last-child{
        border-radius: 0 1em 1em 0;
      }
      /* for the btns that aren't the first or the last, without border radious*/
      button{
        border-radius: 0;
      }
    }
    button{
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid black;
      background-color: #f0f0f0;
      cursor: pointer;
      transition: all .1s ease-in-out;
      &:hover{
        background-color: ${primaryColor};
        color: ${secondaryColor};
      }
    }
  }
`
