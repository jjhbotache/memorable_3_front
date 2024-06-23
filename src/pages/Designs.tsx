import styled from "styled-components"
import { primaryColor, secondaryColor } from "../constants/styleConstants"
import Navbar from "../components/global/navbar/Navbar"
import DesignsContainer from "../components/design/designContainer/DesignContainer"
import {useState } from "react"
import Design from "../interfaces/designInterface"
import DesignShowerManager from "../components/design/designShowerManager/DesignShowerManager"
import { useLoaderData } from "react-router-dom"
import Tag from "../interfaces/tagInterface"

export default function Designs() {
  // const [designData, setDesignsData] = useState<Desing[]>([]);
  // const [loading, setLoading] = useState(true);
  const [arragmentState, setArragmentState] = useState<"column"|"grid">("column");

  const {designs:designData, tags: preloadedTags} = useLoaderData() as {designs:Design[], tags:Tag[]};

  function switchArrangment() {
    arragmentState === "column" ? setArragmentState("grid") : setArragmentState("column")
  }

  return(
    <DesignPage>
      <Navbar/>
      <div className="main">
        <DesignShowerManager arragment={arragmentState} onSwitchArrangment={()=>switchArrangment()} tags={preloadedTags} />
        {/* {loading */}
        {false
        ?<h1>Cargando......</h1>
        :<DesignsContainer designs={designData} arragment={arragmentState} aiSearch={true}/> 
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