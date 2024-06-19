import { useEffect, useState } from "react";
import Desing from "../../../interfaces/designInterface";
import { DesignsStyledContainer } from "./designContainerStyledComponents";
import DesignComponent from "../designComponent/DesignComponent";
import { useSelector } from "react-redux";
import { Filter } from "../../../interfaces/filterInterface";
import orderRandomizer from "../../../helpers/orderRandomizer";

interface DesignContainerProps {
  designs: Desing[];
  arragment: "grid" | "column";
}
export default function DesignContainer({designs,arragment}:DesignContainerProps) {
  const [loved, setLoved] = useState(false);
  const [designsToShow, setdesignsToShow] = useState<Desing[]>([]);
  const filter:Filter = useSelector((state:any)=>state.filter);

  useEffect(() => {
    // filter by name
    let designsFiltered = designs.filter(design => design.name.toLowerCase().includes(filter.name.toLowerCase()));

    designsFiltered = designsFiltered.filter(design => {
      const tags = design.tags.map(tag => tag.id);
      return filter.tags.every(tag => tags.includes(tag.id));
    });


    // randomize the order
    designsFiltered = orderRandomizer(designsFiltered);
    setdesignsToShow(designsFiltered);
  }, [
    filter,designs
  ]);


  
  return(
    
    <DesignsStyledContainer $styleBehavior={arragment}>
      {
        (designsToShow.length != 0) ? designsToShow.map((design:Desing) => {
          return(
            <DesignComponent design={design} displayStyle={arragment} key={design.id} loved={loved} onChangeLoved={()=>setLoved(!loved)} />
          )
        })
        :
        <h1>No se encontraron diseños</h1>

      }
    </DesignsStyledContainer>
  )
};
