import { useDispatch, useSelector } from "react-redux";
import { StyledShowerManager } from "./DesignShowerManagerStyledComponents";
import { Filter } from "../../../interfaces/filterInterface";
import { setFilter } from "../../../redux/slices/filterReducer";
import Tag from "../../../interfaces/tagInterface";
import ArrangmentSwitch from "../arrangmentSwitch/ArrangmentSwitch";
interface props{
  onSwitchArrangment: ()=>void;
  arragment: "grid" | "column";
  tags: Tag[];
}
export default function DesignShowerManager({onSwitchArrangment,arragment,tags}:props) {
  const filter:Filter = useSelector((state:any)=>state.filter);
  const dispacher = useDispatch();




  function onSearchName(str:String) {
    dispacher(
      setFilter({
        name:str,
        tags:filter.tags
      })
    )
  }

  function onCheckTag(tagId: number) {
      const tag: Tag | undefined = tags?.find(tag => tag.id === tagId);
      
      if (tag) {
          if (filter.tags && filter.tags.includes(tag)) {
              dispacher(
                  setFilter({
                      name: filter.name,
                      tags: filter.tags.filter(t => t.id !== tag.id)
                  })
              )
          } else {
              dispacher(
                  setFilter({
                      name: filter.name,
                      tags: [...(filter.tags || []), tag]
                  })
              )
          }
      }
  }


  
  return(
    <StyledShowerManager>
      <input className="search" type="text" placeholder="Busca un diseño" onChange={e=>onSearchName(e.target.value)} value={filter.name} />

      <details className="filter">
        <summary>
          <i className="fi fi-sr-settings-sliders">
            {filter.tags.length > 0 && <span className="badge">{filter.tags.length}</span>}
          </i>
        </summary>
        <div className="floatingInfo">
            <i className=""></i>
            <h3>Filtros</h3>
            <hr className="divider"/>
            <h4>tags</h4>
            <div className="tagsContainer">
              <button onClick={()=>{ dispacher(setFilter({name:filter.name,tags:[]})) }}>Limpiar filtros</button>
              {/* list of tags checkbox */}
              {tags && tags.sort((a:Tag, b:Tag) => (a.order||-1)-(b.order||-1)).map((tag)=>
                <label key={tag.id}>
                  <input type="checkbox" 
                  checked={filter.tags && filter.tags.find(t=>t.id===tag.id) ? true : false} 
                  onChange={()=>onCheckTag(tag.id)}/>
                  {tag.name}
                </label>
              )}
            </div>
        </div>
      </details>

      {/* <div className="arragmentBtns">
        <i onClick={()=>onSwitchArrangment()} className={"fi fi-ss-apps "+(arragment==="grid" && "active")}></i>
        <i onClick={()=>onSwitchArrangment()} className={"fi fi-sr-table-list " + (arragment==="column" && "active")}></i>
      </div> */}
      <ArrangmentSwitch arragment={arragment} onColumn={()=>onSwitchArrangment()} onGrid={()=>onSwitchArrangment()} />
    </StyledShowerManager>
  )
};

