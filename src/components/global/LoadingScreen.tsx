import styled from "styled-components";
import { primaryColor } from "../../constants/styleConstants";
import { useEffect, useState } from "react";

interface Props {
  show?: boolean;
  forElement?: boolean;
}

export default function LoadingScreen({show=true}:Props) {
  const [takingToLong, settakingToLong] = useState<boolean>(false);

  useEffect(() => {
    // wait 10 secs and show a message
    setTimeout(() => {
      settakingToLong(true);
    }, 5000);
  }, []);


  return show ?(
    <Container>
      <img src="wine.gif" alt="wine"/>
      {
        takingToLong && <div className="takingToLong">
          <h3>Podemos llegar a tardar hasta un minuto</h3>
          <h1>Gracias por tu paciencia!</h1>

        </div>
      }
    </Container>
  )
  : null;
  
};



  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9988;

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

      position: relative;
      z-index: 9999999;
    }
    
    .takingToLong{
      position: absolute;
      padding: 1em;
      text-align: center;
      color: white;
      width: 100%;
      height: 100%;
      h3{
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        top: 1em;
      }
      h1{
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        bottom: 1em;

      }

    }
  `;