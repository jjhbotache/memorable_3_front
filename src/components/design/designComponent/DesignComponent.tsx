import Desing from "../../../interfaces/designInterface";
import { DesignComponentStyledContainer } from "./designComponentStyledComponents";

interface DesignComponentProps {
    displayStyle: "grid" | "column";
    design: Desing;
    loved: boolean;
}
export default function DesignComponent({displayStyle,design,loved}:DesignComponentProps) {
  return(
    <DesignComponentStyledContainer styleBehavior={displayStyle}>
      {displayStyle === "column" ?
        <>
          <img src={design.img_url} alt={design.name}/>
          <div className="rightSide">
            <div className="titleAndHeart">
              <h1 className="title">{design.name}</h1>
              <i className={(loved?"fi fi-ss-heart ":"fi fi-bs-heart ") + "heart"}></i>
            </div>
            <div className="btns">
              <button className="addCart"><span >Agregar al carrito</span><i className="fi fi-rr-shopping-cart"></i></button>
              <button className="buy">Comprar</button>
            </div>
          </div>
        </>
        :
        <>
          <i className={(loved?"fi fi-ss-heart ":"fi fi-bs-heart ") + "heart"}></i>
          <img src={design.img_url} alt={design.name}/>
          <h1 className="title">{design.name}</h1>
          <div className="btns">
              <button className="addCart"><span >Agregar al carrito</span><i className="fi fi-rr-shopping-cart"></i></button>
              <button className="buy">Comprar</button>
            </div>
        </>
      }
    </DesignComponentStyledContainer>
  )
};
