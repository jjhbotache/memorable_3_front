import styled from "styled-components";
import Navbar from "../components/global/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { primaryColor, secondaryColor } from "../constants/styleConstants";

export default function Error() {
  const navigate = useNavigate();


  const goStart = () => {
    navigate("/");
  }

  return(
    <Container>
      <Navbar />
      <div className="main">
        <h1>Error</h1>
        <h2>Ups, ha habido un error</h2>
        <button onClick={goStart}>Ir al inicio</button>
      </div>
    </Container>
  )
};


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  .main{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button{
      margin: .2em;
      padding: .2em;
      border: none;
      background-color: ${secondaryColor};
      border-radius: .2em;
      color: ${primaryColor};
      border: 1px solid ${primaryColor};
      cursor: pointer;

      &:hover{
        background-color: ${primaryColor};
        color: ${secondaryColor};
      }

    }
  }
`;