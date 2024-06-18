import { useState } from "react";
import Desing from "../../../interfaces/designInterface";
import { DesignsStyledContainer } from "./designContainerStyledComponents";
import DesignComponent from "../designComponent/DesignComponent";

interface DesignContainerProps {
  designs: Desing[];
  arragment: "grid" | "column";
}
export default function DesignContainer({designs,arragment}:DesignContainerProps) {
  const [loved, setLoved] = useState(false);


  return(
    
    <DesignsStyledContainer $styleBehavior={arragment}>
      {
        Array.isArray(designs) && designs.map((design:Desing) => {
          return(
            <DesignComponent design={design} displayStyle={arragment} key={design.id} loved={loved} onChangeLoved={()=>setLoved(!loved)} />
          )
        })
      }
    </DesignsStyledContainer>
  )
};
