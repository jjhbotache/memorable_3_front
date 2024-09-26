import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import Design from "../interfaces/designInterface";
import { API } from "../constants/appConstants";
import { useNavigate } from "react-router-dom";
import DesignsContainer from "../components/design/designContainer/DesignContainer";
import ArrangmentSwitch from "../components/design/arrangmentSwitch/ArrangmentSwitch";
import myFetch from "../helpers/myFetch";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/slices/filterReducer";
import SimpleSpinner from "../components/global/SimpleSpinner";

export default function Loved() {
  const [lovedDesigns, setLovedDesigns] = useState<Design[] | undefined>(undefined);
  const [arragment, setArragment] = useState<"column" | "grid">("column");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispacher = useDispatch();

  const fetchLovedDesigns = useCallback(() => {
    setLoading(true);

    myFetch(API + "/designs/public")
      .then(res => res.json())
      .then((data: Design[]) => {
        console.log(data);
        data = data.filter(design => design.loved);
        setLovedDesigns(data);
      })
      .catch(e => {
        console.log(e);
        setTimeout(() => {
          fetchLovedDesigns();
        }, 1000);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.google_sub) {
      toast.error("Debes iniciar sesión para poder ver tus diseños favoritos");
      navigate("/login");
    }
    fetchLovedDesigns();
    dispacher(
      setFilter({
        name: "",
        tags: [],
      })
    );

  }, [navigate, dispacher, fetchLovedDesigns]);


  return (
    <Container>
      <div className="main">
        <h1 className="pageTitle">Mis Favoritos</h1>
        <div className="swithContainer">
          <ArrangmentSwitch arragment={arragment} onColumn={() => setArragment("column")} onGrid={() => setArragment("grid")} />
        </div>
        {loading ? (
          <div className="loaderContainer">
            <SimpleSpinner />
          </div>
        ) : lovedDesigns?.length ? (
          <DesignsContainer designs={lovedDesigns} arragment={arragment} />
        ) : (
          <p>No hay diseños favoritos.</p>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  color: var(--primaryColor);
  background-color: var(--secondaryColor);
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;

    .main{
      padding: 0 1em;
      box-sizing: border-box;
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;



    .pageTitle {
      font-family: "Hellovalentina";
      font-size: 4em;
      font-weight: 300;
    }
    .swithContainer {
      max-width: 100px;
    }

    .loaderContainer {
      flex: 1;
      display: grid;
      place-items: center;
    }

    .buyBottlesBtn {
      font-family: "Hellovalentina";
      font-size: 4em;
      padding: 0.2em 0.5em;
      background-color: var(--secondaryColor);
      border: 2px solid var(--primaryColor);
      color: var(--primaryColor);
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s;
      max-width: 300px;
      margin: 0 auto;
      box-sizing: border-box;

      small {
        display: block;
        font-size: 0.2em;
        font-family: "Montserrat";
        font-weight: 400;
      }

      &:hover {
        background-color: var(--primaryColor);
        color: var(--secondaryColor);
      }
    }
  }
`;