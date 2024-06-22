import { useEffect, useRef, useState } from "react";
import Desing from "../../../interfaces/designInterface";
import { DesignsStyledContainer } from "./designContainerStyledComponents";
import DesignComponent from "../designComponent/DesignComponent";
import { useSelector } from "react-redux";
import { Filter } from "../../../interfaces/filterInterface";
import orderRandomizer from "../../../helpers/orderRandomizer";
import { fetchAiFilteredDesigns } from "../../../helpers/provider";
import isElementVisible from "../../../helpers/isElementVisible";

interface DesignContainerProps {
  designs: Desing[];
  arragment: "grid" | "column";
  aiSearch?: boolean;
}
export default function DesignsContainer({designs,arragment,aiSearch=false}:DesignContainerProps) {
  const [designsToShow, setdesignsToShow] = useState<Desing[]>([]);
  const [aiFilteredDesigns, setAiFilteredDesigns] = useState<Desing[]>([]);
  const [iaLoading, setIaLoading] = useState<boolean>(false);
  const [showTakeToAiResults, setShowTakeToAiResults] = useState<boolean>(false);
  const filter:Filter = useSelector((state:any)=>state.filter);


  let searchTimeout = useRef<any>();
  const aiTitleRef = useRef<HTMLHeadingElement>(null); 
  const aiDesignsRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    function onScroll() {
      setShowTakeToAiResults(
        !(isElementVisible(aiTitleRef.current) || isElementVisible(aiDesignsRef.current))
      );
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);  
    };
  }, []);
  const scrollToAiTitle = () => {
  if (aiTitleRef.current) {
    const { top } = aiTitleRef.current.getBoundingClientRect();
    const offset = 100; // Cantidad de píxeles que quieres que el scroll se detenga por encima del elemento
    window.scrollBy({
      top: top - offset,
      behavior: "smooth",
    });
  }
};

  useEffect(() => {

    // filter by name
    console.log("filtered designs");
    console.log(designs);
    
    let designsFiltered =designs ? designs.filter(design => design.name.toLowerCase().includes(filter.name.toLowerCase())) : [];

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
    if(filter.name.length > 3 && aiSearch) {
      setIaLoading(true);
      searchTimeout.current = setTimeout(() => {
        console.log("fetching ai filtered designs");        
        clearTimeout(searchTimeout.current);
        fetchAiFilteredDesigns(filter.name).then((data) => {
          console.log(data);
          setIaLoading(false);
          setAiFilteredDesigns(data.result);
          setShowTakeToAiResults(
        !(isElementVisible(aiTitleRef.current) || isElementVisible(aiDesignsRef.current))
      );
        })
      }, 2000);
    };


  }, [
    filter,designs
  ]);


  
  
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

      {
        aiSearch && <>

        {showTakeToAiResults && <button className="takeToAiResults" onClick={scrollToAiTitle}>
          Ver {aiFilteredDesigns.length} Diseño{aiFilteredDesigns.length!=1 && "s"} sugerido{aiFilteredDesigns.length!=1 && "s"} por IA
          <i className="fi fi-br-angle-small-down"></i>
        </button>}
      <div className="aiDesingsHeader" ref={aiTitleRef}>
        <h2 className="aiTitle">
          {iaLoading ? "Buscando diseños sugeridos por IA . . ." : <>
            {aiFilteredDesigns.length} Diseño{aiFilteredDesigns.length!=1 && "s"} sugerido{aiFilteredDesigns.length!=1 && "s"} por IA
          </>}
          
        </h2>
      </div>
      {
        (aiFilteredDesigns.length != 0) && aiFilteredDesigns.map((design:Desing) => {
          return(
            <DesignComponent ref={aiDesignsRef} design={design} displayStyle={arragment} key={design.id} />
          )
        })
      }
        </>
      }
    </DesignsStyledContainer>
  )
};
