import styled from "styled-components";
import { useEffect, useState } from "react";
import Design from "../interfaces/designInterface";
import { API } from "../constants/appConstants";
import { useNavigate } from "react-router-dom";
import DesignsContainer from "../components/design/designContainer/DesignContainer";
import ArrangmentSwitch from "../components/design/arrangmentSwitch/ArrangmentSwitch";
import { primaryColor, secondaryColor } from "../constants/styleConstants";
import { toast } from "react-toastify";
import myFetch from "../helpers/myFetch";

export default function Loved() {
  const [lovedDesigns, setlovedDesigns] = useState<Design[]>([]);
  const [arragment, setArragment] = useState<"column" | "grid">("column");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if(!user.google_sub) {
      toast.error("Debes iniciar sesión para poder ver tus favoritos");
      navigate("/login")
    };
    // get the loved designs
    fetchLovedDesigns();

  }, []);


  return(
    <Container>
      <div className="main">
        <h1 className="pageTitle">Mis favoritos</h1>
        <div className="swithContainer">
          <ArrangmentSwitch arragment={arragment} onColumn={()=>setArragment("column")} onGrid={()=>setArragment("grid")} />
        </div>
        <DesignsContainer designs={lovedDesigns} arragment={arragment} />
      </div>
    </Container>
  )

  function fetchLovedDesigns() {
    myFetch(API+"/designs/public")
      .then(res=>res.json())
      .then((data:Design[]) => {
        console.log(data);
        // filter by addedtocart
        data = data.filter(design => design.loved)
        
        setlovedDesigns(data)
      })
      .catch(e=>{
        console.log(e);
        setTimeout(() => {
          fetchLovedDesigns()
        }, 1000)
      })
  }
};


const Container = styled.div`
  color: ${primaryColor};
  background-color: ${secondaryColor};
    .main{
       .pageTitle{
        font-family: "Hellovalentina";
        font-size: 4em;
        font-weight: 300;
      }
      .swithContainer{
        max-width: 100px;
      }
      padding: 1em .2em;
      display: flex;
      flex-direction: column;
      gap: 1em;
      height: 100%;
      min-height: 95vh;
    }
  `;
