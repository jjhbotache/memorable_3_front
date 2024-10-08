import { useEffect, useRef, useState } from "react";
import Design from "../../../interfaces/designInterface";
import { DesignsStyledContainer } from "./designContainerStyledComponents";
import DesignComponent from "../designComponent/DesignComponent";
import { useSelector } from "react-redux";
import { Filter } from "../../../interfaces/filterInterface";
import orderRandomizer from "../../../helpers/orderRandomizer";
import { fetchAiFilteredDesigns } from "../../../helpers/provider";
import isElementVisible from "../../../helpers/isElementVisible";
import { levenshteinDistance } from "../../../helpers/orderBySimilarity";
import CoolSpinner from "../../global/CoolSpinner";

interface DesignContainerProps {
  designs: Design[];
  arragment: "grid" | "column";
  aiSearch?: boolean;
}

export default function DesignsContainer({ designs, arragment, aiSearch = false }: DesignContainerProps) {
  const [designsToShow, setdesignsToShow] = useState<Design[]>([]);
  const [aiFilteredDesigns, setAiFilteredDesigns] = useState<Design[]>([]);
  const [iaLoading, setIaLoading] = useState<boolean>(false);
  const [aiAlreadyScrolled, setaiAlreadyScrolled] = useState<boolean>(false);
  const [showTakeToAiResults, setShowTakeToAiResults] = useState<boolean>(false);
  const filter: Filter = useSelector((state: any) => state.filter);

  const searchTimeout = useRef<any>();
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
      setShowTakeToAiResults(false);
      setaiAlreadyScrolled(true);
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
    let designsFiltered = designs ? designs.filter(design => 
      levenshteinDistance(design.name.toLowerCase(), filter.name.toLowerCase()) < (
        Math.abs(design.name.length - filter.name.length)*1.5
      ) ||
      design.name.toLowerCase().includes(filter.name.toLowerCase()) ||
      filter.name.toLowerCase().includes(design.name.toLowerCase()) ||
      design.tags.map(tag => tag.name.toLowerCase()).includes(filter.name.toLowerCase()) ||
      filter.name.toLowerCase().includes(design.tags.map(tag => tag.name.toLowerCase()).join(" "))
    ) : [];

    // filter by tags
    designsFiltered = designsFiltered.filter(design => {
      const tags = design.tags.map(tag => tag.id);
      return filter.tags.every(tag => tags.includes(tag.id));
    });

    // order by Levenshtein distance
    designsFiltered.sort((a, b) => levenshteinDistance(a.name.toLowerCase(), filter.name.toLowerCase()) - levenshteinDistance(b.name.toLowerCase(), filter.name.toLowerCase()));
    
    // put first, the designs that have filter.name in their name
    designsFiltered.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName.includes(filter.name.toLowerCase()) && !bName.includes(filter.name.toLowerCase())) return -1;
      return 0;
    });


    // randomize the order
    // const designsFilteredRandomized = orderRandomizer(designsFiltered);

    if (filter.name == "") designsFiltered = orderRandomizer(designsFiltered);
    setdesignsToShow(designsFiltered);

    // AI filtered designs
    clearTimeout(searchTimeout.current);
    if (filter.name.length > 3 && aiSearch) {
      setIaLoading(true);
      setAiFilteredDesigns([]);
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
    }

  }, [filter, designs, aiSearch]);

  return (
    <DesignsStyledContainer $styleBehavior={arragment}>
      <small className="foundDesigns">{designsToShow.length} Diseño{designsToShow.length > 1 && "s"} encontrado{designsToShow.length > 1 && "s"}</small>
      {
        (designsToShow.length != 0) ? designsToShow.map((design: Design) => {
          return (
            <DesignComponent design={design} displayStyle={arragment} key={design.id} />
          )
        })
        :
        <h1>No se encontraron diseños con coincidencia exacta</h1>
      }

        
      {
        (aiSearch && aiFilteredDesigns.length > 0 )
        ? <>
          {(showTakeToAiResults && aiAlreadyScrolled == false) && <button className="takeToAiResults" onClick={scrollToAiTitle}>
            Ver {aiFilteredDesigns.length} Diseño{aiFilteredDesigns.length != 1 && "s"} sugerido{aiFilteredDesigns.length != 1 && "s"} por IA
            <i className="fi fi-br-angle-small-down"></i>
          </button>}
          <div className="aiDesingsHeader" ref={aiTitleRef}>
            <h2 className="aiTitle">
              {iaLoading ? "Buscando diseños sugeridos por IA . . ." : <>
                {aiFilteredDesigns.length} Diseño{aiFilteredDesigns.length != 1 && "s"} sugerido{aiFilteredDesigns.length != 1 && "s"} por IA
              </>}
            </h2>
          </div>
          {
            (aiFilteredDesigns.length != 0) && aiFilteredDesigns.map((design: Design) => {
              return (
                <DesignComponent ref={aiDesignsRef} design={design} displayStyle={arragment} key={design.id} />
              )
            })
          }
        </>
        :
        iaLoading && <div className="aiDesingsHeader">
          <h2>La IA esta buscando diseños que te podrian gustar!</h2>
          <CoolSpinner />
        </div>

      }
    </DesignsStyledContainer>
  )
}