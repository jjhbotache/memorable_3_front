import styled from "styled-components";
import { mdScreen } from "../../../constants/styleConstants";

export const HowSectionStyledComponent = styled.section`
  .mainVideo{
    position: relative;
    background: #222;
    display: flex;
    flex-direction: column;


    
    .topGradient{
      width: 100%;
      height: 100px;
      background: linear-gradient(
        to top,
        var(--secondaryColor),
        var(--background)
      );
    }
    .bottomGradient{
      width: 100%;
      height: 100px;
      background: linear-gradient(
        to bottom,
        var(--secondaryColor),
        var(--background)
      );
    }
    svg{
      display: relative;
      width: 100%;
      &:first-child{
        z-index: 2;
        margin-bottom: -11%;
      }
      &:last-child{
        margin-top: -11%;
      }
    }
    .videoContainer{
      z-index: 1;

      max-width: 85vw;
      max-height: 85vh;
      aspect-ratio: 1/1;
      margin: 0 auto;

      
      display: flex;
      justify-content: center;
      align-items: center;
      
      video {
        height: 100%;
        width: auto;
        border-radius: .3em;
        border:  1px solid var(--primaryColor);
        padding: .3em;
        box-sizing: content-box;
      }
    }
  }

  .divider{
    width: 85%;
    margin: 8em auto;
    height: 1px;
    background: var(--secondaryColor);
  }

  .mainText{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding: 1em;
    margin: 8em 0;
    h2{
      font-size: clamp(3em, 9vw, 9vw);
      text-align: center;
    }
    span{
      font-family: "HelloValentina";
      font-weight: 300;
    }
    p{
      font-size: clamp(1em, 5vw, 1.5em);
      text-align: center;
    }
  }

  .mainSteps {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    padding: 2em;
    background: var(--background);
    border-radius: 0.5em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: clamp(3em, 6vw, 6vw);
      text-align: center;
      color: var(--primaryColor);
      font-family: "HelloValentina";
      font-weight: 300;
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: 1.5em;

      video{
        border-radius: 0.5em;
        border:  1px solid var(--primaryColor);
        padding: .3em;
        max-height: 500px;
        max-width: 100%;
      }

      .step1, .step2 {  
        display: flex;
        align-items: center;
        gap: 2em;
        background: var(--secondaryBackground);
        padding: 1.5em;
        border-radius: 0.5em;
        box-shadow: 0 .4em .6em rgba(0, 0, 0, 0.4);

        

        h3 {
          font-size: clamp(1.2em, 4vw, 2em);
          color: var(--primaryColor);
        }
  
        p {
          font-size: clamp(1em, 3vw, 1.2em);
          color: var(--textColor);
        }
      }
      @media screen and (width<${mdScreen}px){
          .step1{
            flex-direction: column;
          }
          .step2{
            flex-direction: column-reverse !important ;
          }
        }

    }
  }

  .finalProduct{
    background: linear-gradient(
      to bottom,
      var(--background) 0%,
      #222 5%,
      #222 95%,
      var(--background) 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding: 5em 2em;
    border-radius: 0.5em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: clamp(3em, 6vw, 6vw);
      text-align: center;
      color: var(--primaryColor);
      font-family: "HelloValentina";
      font-weight: 300;
    }

    p {
      font-size: clamp(1em, 5vw, 1.5em);
      text-align: center;
      color: var(--textColor);
      max-width: 600px;
    }

    video {
      border-radius: 0.5em;
      border:  1px solid var(--primaryColor);
      padding: .3em;
      max-height: 500px;
      max-width: 100%;
    }

  }
`
