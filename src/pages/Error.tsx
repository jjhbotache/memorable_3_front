import styled from "styled-components";
import Navbar from "../components/global/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SimpleSpinner from "../components/global/SimpleSpinner";
import { darkPrimaryColor, darkSecondaryColor,  darkBackground } from "../constants/styleConstants";

export default function Error() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const goStart = () => {
    setLoading(true);
    navigate("/");
  };

  return (
    <Container>
      <Navbar />
      <div className="main">
        <h1 className="pageTitle">Error</h1>
        <h2>Ups, ha habido un error</h2>
        <button onClick={goStart} disabled={loading}>
          {loading ? <SimpleSpinner /> : "Ir al inicio"}
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  color: ${darkPrimaryColor};
  background-color: ${darkBackground};
  display: flex;
  flex-direction: column;
  flex: 1;
  .main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    flex: 1;


    .pageTitle {
      font-family: "Hellovalentina";
      font-size: 4em;
      font-weight: 300;
      margin-bottom: 0.5em;
    }

    h2 {
      font-family: "Montserrat";
      font-size: 2em;
      font-weight: 400;
      margin-bottom: 1em;
    }

    button {
      font-family: "Hellovalentina";
      font-size: 2em;
      padding: 0.5em 1em;
      background-color: ${darkSecondaryColor};
      border: 2px solid ${darkPrimaryColor};
      color: ${darkPrimaryColor};
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: ${darkPrimaryColor};
        color: ${darkSecondaryColor};
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }
  }
`;