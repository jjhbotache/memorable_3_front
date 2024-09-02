import styled from "styled-components"
import { primaryColor } from "../constants/styleConstants"
import DesignsContainer from "../components/design/designContainer/DesignContainer"
import {useState } from "react"
import Design from "../interfaces/designInterface"
import DesignShowerManager from "../components/design/designShowerManager/DesignShowerManager"
import { useLoaderData } from "react-router-dom"
import Tag from "../interfaces/tagInterface"

export default function Designs() {
  const [arragmentState, setArragmentState] = useState<"column"|"grid">("grid");

  const {designs:designData, tags: preloadedTags} = useLoaderData() as {designs:Design[], tags:Tag[]};  

  function switchArrangment() {
    arragmentState === "column" ? setArragmentState("grid") : setArragmentState("column")
  }

  return(
    <DesignPage>
        <DesignShowerManager arragment={arragmentState} onSwitchArrangment={()=>switchArrangment()} tags={preloadedTags} />
        {/* {loading */}
        {false
        ?<h1>Cargando......</h1>
        :<DesignsContainer designs={designData} arragment={arragmentState} aiSearch={true}/> 
        }
    </DesignPage>  
  )
};


/* src/pages/Designs.tsx */
const DesignPage = styled.div`
  width: 100%;
  color: ${primaryColor};
  flex-grow: 1;
  display: flex;
  flex-direction: column;

`;