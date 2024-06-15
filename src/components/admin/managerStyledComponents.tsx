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
  .divider{
    margin: .1rem 0;
    border: 0;
    border-top: 1px solid black;
  
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
  form{
    margin: auto;
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
    max-width: 240px;
    box-sizing: border-box;
    img.icon{
      width: 50px;
      height: 50px;
      border-radius: 1em;
    }
    img{
      width: 100%;
      height: 100%;
      max-width: 200px;
      max-height: 200px;
      border-radius: 1em;
    }
    p{
      margin: 0;
      text-align: center;
    }
    .btns{
      display: flex;
      /* for the first btn, the right corners without a border radious */
      button:first-child,a:first-child{
        border-radius: 1em 0 0 1em;
        }
      button:last-child,a:last-child{
        border-radius: 0 1em 1em 0;
      }
      /* for the btns that aren't the first or the last, without border radious*/
    }
    button,a{
      text-align: center;
      text-decoration: none;
      color: ${primaryColor};
      padding: 0.5rem;
      border-radius: 0;
      border: 1px solid black;
      background-color: #f0f0f0;
      cursor: pointer;
      transition: all .1s ease-in-out;
      &:hover:not([disabled]){
        background-color: ${primaryColor};
        color: ${secondaryColor};
      }
    }
    button:disabled{
      background-color: #f0f0f0;
      color: #a0a0a0;
      cursor: not-allowed;
    }

  }

  details{
    width: 100%;
    position: relative;
    summary{
      cursor: pointer;
    }

    .floatingContent{
      position: absolute;
      top: -200%;
      background-color: ${secondaryColor};
      border: 1px solid black;
      border-radius: 5px;
      padding: 1rem;
      margin: 1rem;
      width: 90%;
      box-sizing: border-box;
    }
  }
`

interface StyledManagerProps {
  open?: boolean;
}

export const EditorContainer = styled.div<StyledManagerProps>`
  ${props => props.open ?"display: flex;":"display: none;"}

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  justify-content: center;
  align-items: center;
  z-index: 100;
  
  .main{
    .close{
      position: absolute;
      top: 0;
      right: 0;
      font-size: 2em;
      cursor: pointer;
      transition: all .1s ease-in-out;
      &:hover{
        color: red;
      }
    }
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: .3em solid ${primaryColor};
    color: ${primaryColor};
    border-radius: 5px;
    background: ${tertiaryColor};
    box-sizing: border-box;

    max-width: 600px;
    width: 80%;
    height: 90%;
    max-height: 600px;

    form{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: auto;
      padding: 1rem;
      border: 1px solid ${primaryColor};
      color: ${primaryColor};
      border-radius: 5px;
      background: ${secondaryColor};
      max-width: 600px;
      width: 80%;
      box-sizing: border-box;
      input {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid black;
      }
      input.required{
        border: 2px solid ${primaryColor};
      }
      button {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid black;
        background-color: #f0f0f0;
        cursor: pointer;
        transition: all .1s ease-in-out;
        &:hover:not([disabled]){
          background-color: ${primaryColor};
          color: ${secondaryColor};
        }
      }
      .divider{
        margin: .1rem 0;
        border: 0;
        border-top: 1px solid black;
      }
    }
  }

  img{
    width: 100%;
    height: 100%;
    max-width: 200px;
    max-height: 200px;
    border-radius: 1em;
  }
  img.small{
    width: 50px;
    height: 50px;
    border-radius: 1em;
  }
  
  
`
