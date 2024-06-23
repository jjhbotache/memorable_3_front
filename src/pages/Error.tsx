import styled from "styled-components";
import Navbar from "../components/global/navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  const retry = () => {
    navigate(-1);
  }

  const goStart = () => {
    navigate("/");
  }

  return(
    <Container>
      <Navbar />
      <h1>Error</h1>
      <h2>Ups, ha habido un error</h2>
      <button onClick={retry}>Reintentar</button>
      <button onClick={goStart}>Ir al inicio</button>
    </Container>
  )
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;