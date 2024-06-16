import { StyledShowerManager } from "./DesignShowerManagerStyledComponents";
interface props{
  onSwitchArrangment: ()=>void;
  arragment: "grid" | "column";
}
export default function DesignShowerManager({onSwitchArrangment,arragment}:props) {
  return(
    <StyledShowerManager>
      <input className="search" type="text" placeholder="Busca un diseño" />
      <details className="filter">
        <summary>Ordenar & Filtrar</summary>
        <div className="floatingInfo">
          aqui van los filtros
        </div>
      </details>
      <div className="arragmentBtns">
        <i onClick={()=>onSwitchArrangment()} className={"fi fi-ss-apps "+(arragment==="grid" && "active")}></i>
        <i onClick={()=>onSwitchArrangment()} className={"fi fi-sr-table-list " + (arragment==="column" && "active")}></i>
      </div>
    </StyledShowerManager>
  )
};

