import { mdScreen, primaryColor, secondaryColor } from "../../constants/styleConstants";
import contactSvg from "../../assets/svgs/contact us.svg";
import styled from "styled-components";

export const ContactFormStyled = styled.div`
  @media screen and (width < ${mdScreen}px){
    flex-basis: 95%;
  }
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media screen and (width < ${mdScreen}px){
          background-image: url(${contactSvg});
          /* turn down the opacity of the bg image */
          background-color: rgba(255,255,255,.7);
          background-blend-mode: lighten;
          background-size: cover;
          background-position: center;
          flex-basis: 95%;
        }

  .form{
        height: 100%;
        

        flex-basis: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: "HelloValentina";
        h1{
          font-size: 4em;
          font-weight: 300;
        }
        input,textarea{
          @media screen and (width < ${mdScreen}px){
            background: rgba(255,255,255,.7);
          }
          width: 80%;
          max-width: 300px;
          border: 1px solid ${primaryColor};
          border-radius: 9999px;
          padding: .2em .5em;
          margin: 7px;
          font-size: 1.5em;
          font-family: "FragmentCore";
          padding-left: 1em;
        }
        textarea{
          resize: none;
          height: 3em;
          border-radius: 1em;
        }
        button{
          border: none;
          background: ${primaryColor};
          color: ${secondaryColor};
          padding: 10px 20px;
          border-radius: 9999px;
          font-size: 1.5em;
          font-family: "FragmentCore";
          cursor: pointer;
          transition: all .2s;
          &:hover{
            transform: scale(1.1);
            box-shadow: 0 0 10px 0 ${primaryColor};
          }
        }
    }

    .divider {
      width: 60%;
      max-width: 80vw;
      margin:.7em 0;
      height: 2px;
      background: repeating-linear-gradient(
        to right,
        ${primaryColor},
        ${primaryColor} 5px,
        transparent 5px,
        transparent 10px
      );
    }
  .separatorText{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 1.2em 0;
  }
  .whatsappIco{
    font-size: 2.5em;
    color: ${secondaryColor};
    background: ${primaryColor};
    border-radius: 50%;
    padding: .3em;
    cursor: pointer;
    transition: all .2s;
    &:hover{
      background: ${secondaryColor};
      color: ${primaryColor};
      border: 1px solid ${primaryColor};
      transform: scale(1.1);
      box-shadow: 0 0 10px 0 ${primaryColor};
    }
  }
`;