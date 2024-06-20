import styled from "styled-components"
import { primaryColor, secondaryColor } from "../constants/styleConstants"
import Navbar from "../components/global/navbar/Navbar"
import DesignsContainer from "../components/design/designContainer/DesignContainer"
import { useEffect, useState } from "react"
import { API } from "../constants/appConstants"
import Desing from "../interfaces/designInterface"
import DesignShowerManager from "../components/design/designShowerManager/DesignShowerManager"
import myFetch from "../helpers/myFetch"

export default function Designs() {
  const [designData, setDesignsData] = useState<Desing[]>([]);
  const [loading, setLoading] = useState(true);
  const [arragmentState, setArragmentState] = useState<"column"|"grid">("column");

  useEffect(() => {
    setLoading(true)
    // fetch designs until get them
    fetchDesigns()
  }, [])

  function fetchDesigns() {
    setLoading(true)
    myFetch(API+"/designs/public")
      .then(res=>res.json())
      .then((data:Desing[]) => {
        console.log(data);
        
        setDesignsData(data)
        setLoading(false)
      })
      .catch(e=>{
        console.log(e);
        setTimeout(() => {
          fetchDesigns()
        }, 1000)
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
        {loading?
        <h1>Cargando......</h1>:
        <DesignsContainer designs={designData} arragment={arragmentState}/> 
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