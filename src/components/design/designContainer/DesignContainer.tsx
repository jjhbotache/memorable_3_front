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
export default function DesignsContainer({designs,arragment}:DesignContainerProps) {
  const [designsToShow, setdesignsToShow] = useState<Desing[]>([]);
  const filter:Filter = useSelector((state:any)=>state.filter);

  useEffect(() => {

    // filter by name
    let designsFiltered = designs.filter(design => design.name.toLowerCase().includes(filter.name.toLowerCase()));

    // filter by tags
    designsFiltered = designsFiltered.filter(design => {
      const tags = design.tags.map(tag => tag.id);
      return filter.tags.every(tag => tags.includes(tag.id));
    });


    // randomize the order
    const designsFilteredRandomized = orderRandomizer(designsFiltered);
    setdesignsToShow(designsFilteredRandomized);
  }, [
    filter,designs
  ]);


  console.log(designsToShow);
  
  return(
    
    <DesignsStyledContainer  $styleBehavior={arragment}>
      <small className="foundDesigns">{designsToShow.length} Diseño{designsToShow.length>1&&"s"} encontrado{designsToShow.length>1&&"s"}</small>
      {
        (designsToShow.length != 0) ? designsToShow.map((design:Desing) => {
          return(
            <DesignComponent design={design} displayStyle={arragment} key={design.id} />
          )
        })
        :
        <h1>No se encontraron diseños</h1>

      }
    </DesignsStyledContainer>
  )
};
