import { useEffect, useState } from "react";
import Desing from "../../../interfaces/designInterface";
import { DesignsStyledContainer } from "./designContainerStyledComponents";
import DesignComponent from "../designComponent/DesignComponent";

interface DesignContainerProps {
  designs: Desing[];
  arragment: "grid" | "column";
  searchFilter?: string;
}
export default function DesignContainer({designs,arragment,searchFilter}:DesignContainerProps) {
  const [loved, setLoved] = useState(false);
  const [designsToShow, setdesignsToShow] = useState<Desing[]>([]);

  useEffect(() => {
    if(!!searchFilter) {
      setdesignsToShow(designs.filter((design) => {
        return design.name.toLowerCase().includes(searchFilter.toLowerCase())
      }))
    } else {
      setdesignsToShow(designs)
    }
  }, [
    searchFilter
  ]);

  return(
    
    <DesignsStyledContainer $styleBehavior={arragment}>
      {
        Array.isArray(designsToShow) && designsToShow.map((design:Desing) => {
          return(
            <DesignComponent design={design} displayStyle={arragment} key={design.id} loved={loved} onChangeLoved={()=>setLoved(!loved)} />
          )
        })
      }
    </DesignsStyledContainer>
  )
};
