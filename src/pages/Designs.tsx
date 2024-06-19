import styled from "styled-components"
import { primaryColor, secondaryColor } from "../constants/styleConstants"
import Navbar from "../components/global/navbar/Navbar"
import DesignsContainer from "../components/design/designContainer/DesignContainer"
import { useEffect, useState } from "react"
import { API } from "../constants/appConstants"
import Desing from "../interfaces/designInterface"
import DesignShowerManager from "../components/design/designShowerManager/DesignShowerManager"

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
    
    const fetchPublicDesigns = () => {
      return new Promise((resolve) => {
      fetch(API + "/designs/public")
        .then(r => r.json())
        .then((data:Desing[]) => {
          resolve(data)
        })
        .catch(() => {
          fetchDesigns()
        })
      })
    }

    const fetchFavoriteDesigns = () => {
      return new Promise((resolve) => {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      fetch(API + "/favorite/" + user.google_sub)
        .then(res => res.json())
        .then((res:Desing[]) => {
          resolve(res.map((d: Desing) => ({ ...d, loved: true })))
        })
        .catch(() => {
          fetchFavoriteDesigns()
        })
      })
    }

    setLoading(true)
    Promise.all([fetchPublicDesigns(), fetchFavoriteDesigns()]).then((values) => {
      // merge the two arrays
      const publicDesigns: Desing[] = values[0] as Desing[]
      const favoriteDesigns = values[1] as Desing[]
      
      // in the public designs, check if the design is in the favorite designs
      const designs = publicDesigns.map((design) => {
        const favoriteDesign = favoriteDesigns.find((d) => d.id === design.id)
        if (favoriteDesign) {
          return {
            ...design,
            loved: true
          }
        }
        return design
      })
      
      setDesignsData(designs)
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