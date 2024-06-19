import styled from "styled-components"
import { primaryColor, secondaryColor } from "../constants/styleConstants"
import Navbar from "../components/global/navbar/Navbar"
import DesignContainer from "../components/design/designContainer/DesignContainer"
import { useEffect, useState } from "react"
import { API } from "../constants/appConstants"
import Desing from "../interfaces/designInterface"
import { toast } from "react-toastify"
import DesignShowerManager from "../components/design/designShowerManager/DesignShowerManager"

export default function Designs() {
  const [designs, setDesigns] = useState<Desing[]>([]);
  const [loading, setLoading] = useState(true);
  const [arragmentState, setArragmentState] = useState<"column"|"grid">("column");

  useEffect(() => {
    setLoading(true)
    // fetch designs until get them
    fetchDesigns()
  }, [])

  function fetchDesigns() {
    fetch(API + "/designs/public")
      .then(r => r.json())
      .then(data => {
        setDesigns(data)
      })
      .catch(err => {
        toast.error("Error al cargar los diseños: " + err)
        toast.error("reintentando...")
        fetchDesigns()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function switchArrangment() {
    arragmentState === "column" ? setArragmentState("grid") : setArragmentState("column")
  }
  return(
    <DesignPage>
      <Navbar/>
      <div className="main">
        <DesignShowerManager arragment={arragmentState} onSwitchArrangment={()=>switchArrangment()} />
        {loading?<h1>Cargando...</h1> :
        <DesignContainer designs={designs} arragment={arragmentState} searchFilter=""/> 
        }
      </div>
    </DesignPage>  
  )
};


const DesignPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${secondaryColor};
  color:${primaryColor};
  .main{
    width: 100%;
    max-width: 800px;
    margin: 1em auto;
  }
  `