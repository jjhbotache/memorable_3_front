import styled from "styled-components";
import { primaryColor } from "../../constants/styleConstants";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  show?: boolean;
  forElement?: boolean;
}

const tips = [
  "Un buen vino mejora con el tiempo, ¡igual que tú!",
  "Cada botella cuenta una historia, ¿cuál es la tuya?",
  "El vino es la respuesta, ¿cuál era la pregunta?",
  // consejos de diseño
  "Escribe la situación para la que necesitas tu diseño en el buscador, la IA buscará por ti!!!",
  "Guarda tus diseños favoritos dando clic en el corazón.",
  "¿Quieres un diseño perfecto? Pide una modificación a tu diseño favorito!",
  "Puedes ver tus diseños favoritos dando clic en el corazón en la barra de navegación o menú!",
  "Puedes contactarnos para cualquier duda o sugerencia en la sección de contacto!",
  "Agrega tus diseños favoritos al carrito para comprarlos luego!",
  "¡Nuestra barra de búsqueda utiliza inteligencia artificial para encontrar el diseño perfecto para ti!",
  "¿No encuentras lo que buscas? Contáctanos y un diseñador te ayudará a crearlo!",
  "¿El diseño está perfecto pero necesitas un cambio? Pide una modificación desde la página del diseño!",
];

export default function LoadingScreen({show = true}:Props){
  const [takingTooLong, setTakingTooLong] = useState<boolean>(false);
  const [currentTip, setCurrentTip] = useState<string>("");

  const timeToShowTips = 10000;

  function changeTip () {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
    // when changed, reset the animation
    
    
  };

  useEffect(() => {
    let intervalId: number;

    if (show) {
    // Espera 10 segundos antes de mostrar los consejos
      setTakingTooLong(true);
      setCurrentTip( tips[Math.floor(Math.random() * tips.length)] );
      
      // Cambia el consejo cada 5 segundos
      intervalId = setInterval(changeTip, timeToShowTips);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [show]);

  if (!show) return null;

  return (
    <Container>
      <img src="/wine.gif" alt="wine"/>
      {takingTooLong && (
        <div className="takingTooLong">
          <span>
            Podemos llegar a tardar hasta un minuto
            <h2>Gracias por tu paciencia!</h2>
          </span>

          <motion.div
            animate={{
              opacity: [0, 1,1, 0],
            }}
            transition={{
              duration: timeToShowTips/1000,
              times : [0, 0.1,0.9, 1],
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut"
            }}
            key={currentTip}
            style={{ width: "100%",textAlign: "center",display: "flex",justifyContent: "center",alignItems: "center"}}
          >
            <p className="tip" onClick={changeTip}>{currentTip}</p>
          </motion.div>          
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9988;;
  box-sizing: border-box;
  background: radial-gradient(
    ${primaryColor}ff 0%,
    ${primaryColor}ee 85%,
    ${primaryColor}ff 150%
  );
  
  img {
    border-radius: 50%;
    aspect-ratio: 1;
    border: .5em solid ${primaryColor};
    width: 100vw;
    max-width: 200px;
    position: relative;
    z-index: 9999999;
  }
  
  .takingTooLong {
    position: absolute;
    
    text-align: center;
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      gap: 1em;
      padding-top: 3em;
    }

    h2 {
      margin-bottom: 1em;
    }

    .tip {
      margin-bottom: 3em;
      font-size: 1.2em;
      font-style: italic;
      max-width: 80%;
      animation: fadeInOut 5s ease-in-out infinite;
      cursor: pointer;
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

`;