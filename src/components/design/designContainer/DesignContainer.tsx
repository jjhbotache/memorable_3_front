import { useEffect, useRef, useState } from "react";
import Desing from "../../../interfaces/designInterface";
import { DesignsStyledContainer } from "./designContainerStyledComponents";
import DesignComponent from "../designComponent/DesignComponent";
import { useSelector } from "react-redux";
import { Filter } from "../../../interfaces/filterInterface";
import orderRandomizer from "../../../helpers/orderRandomizer";
import myFetch from "../../../helpers/myFetch";
import { API } from "../../../constants/appConstants";
import { fetchAiFilteredDesigns } from "../../../helpers/provider";

interface DesignContainerProps {
  designs: Desing[];
  arragment: "grid" | "column";
}
export default function DesignsContainer({designs,arragment}:DesignContainerProps) {
  const [designsToShow, setdesignsToShow] = useState<Desing[]>([]);
  const [aiFilteredDesigns, setAiFilteredDesigns] = useState<Desing[]>([]);
  const filter:Filter = useSelector((state:any)=>state.filter);

  let searchTimeout = useRef<any>();

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

    // AI filtered designs
    clearTimeout(searchTimeout.current);
    if(filter.name.length > 3) {
      searchTimeout.current = setTimeout(() => {
        console.log("fetching ai filtered designs");        
        clearTimeout(searchTimeout.current);
        fetchAiFilteredDesigns(filter.name).then((data) => {
          console.log(data);
          
          setAiFilteredDesigns(data.result);
        })
      }, 3000);
    };
  

  }, [
    filter,designs
  ]);


  // console.log(designsToShow) ;
  
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
        <h1>No se encontraron diseños con coincidencia exacta</h1>
      }
      {aiFilteredDesigns.length != 0 && <>
        <div className="aiDesingsHeader">
          <h2 className="aiTitle">Diseños sugeridos por IA!</h2>
        </div>
      </>}
      {
        (aiFilteredDesigns.length != 0) && aiFilteredDesigns.map((design:Desing) => {
          return(
            <DesignComponent design={design} displayStyle={arragment} key={design.id} />
          )
        })
      }
    </DesignsStyledContainer>
  )
};
