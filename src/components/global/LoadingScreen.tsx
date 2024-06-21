import styled, { css } from "styled-components";
import { primaryColor } from "../../constants/styleConstants";

interface Props {
  show?: boolean;
  forElement?: boolean;
}

export default function LoadingScreen({show=true, forElement=false}:Props) {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    ${forElement ? 
    css`
      height: 100%;
      width: 100%;
      position: relative;
    `: 
    css`
      height: 100vh;
      width: 100vw;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999999;
    `}
    background: radial-gradient(
      ${primaryColor}ff 0%,
      ${primaryColor}ee 85%,
      ${primaryColor}ff 150%
    );
    
    img{
      border-radius: 50%;
      aspect-ratio: 1;
      border: .5em solid ${primaryColor};
      width: 100vw;
      max-width: 200px;

      ${forElement ?
      css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `:
      css`
        position: relative;
      `}
    }
  `;


  return show ?(
    <Container>
      <img src="https://cdn.dribbble.com/users/399001/screenshots/3729257/media/85802f7b6e3ab300a7725ee3512adb84.gif" alt="wine"/>
    </Container>
  )
  : null;
  
};


