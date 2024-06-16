import { useState } from "react";
import Desing from "../../../interfaces/designInterface";
import { DesignsStyledContainer } from "./designContainerStyledComponents";

interface DesignContainerProps {
  designs: Desing[];
  arragment: "grid" | "column";
}
export default function DesignContainer({designs,arragment}:DesignContainerProps) {
  const [loved, setLoved] = useState(false);
  return(
    
    <DesignsStyledContainer styleBehavior={arragment}>
      {
        Array.isArray(designs) && designs.map((design:Desing) => {
          return(
            <div className="design">
              <img src={design.img_url} alt={design.name}/>
              <div className="rightSide">
                <div className="text">
                  <h1>{design.name}</h1>
                  <span className="helpText">{design.name}</span>
                  <i onClick={()=>setLoved(!loved)} className={loved?"fi fi-ss-heart heart":"fi fi-bs-heart heart"}></i>
                </div>
                <div className="btns">
                  <button><span className="text">Agregar al carrito</span><i className=" ico fi fi-rr-shopping-cart"></i></button>
                  <button>Comprar</button> 
                </div>
              </div>
            </div>
          )
        })
      }
    </DesignsStyledContainer>
  )
};
