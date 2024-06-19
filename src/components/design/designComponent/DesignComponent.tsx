import { useState } from "react";
import Desing from "../../../interfaces/designInterface";
import { DesignComponentStyledContainer } from "./designComponentStyledComponents";
import { API } from "../../../constants/appConstants";
import { toast } from "react-toastify";
import User from "../../../interfaces/userInterface";

interface DesignComponentProps {
    displayStyle: "grid" | "column";
    design: Desing;
    
}
export default function DesignComponent({displayStyle,design}:DesignComponentProps) {
  const [loved, setLoved] = useState<boolean>(design.loved || false);

  function onChangeLoved() {
    const user:User = JSON.parse(localStorage.getItem("user") || "{}");

    if(!user.google_sub) {
      toast.error("Debes iniciar sesión para poder agregar a favoritos");
      return;
    }

    if(loved){
      deleteFavorite(user);
    }else{
      addFavorite(user);
    }

  }

  function addFavorite(user:User) {
    fetch(API+"/favorite/add",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_sub: user.google_sub,
        design_id: design.id
      })
    })
    .then(res => res.json())
    .then(data => {
      toast.success("Agregado a favoritos",{autoClose: 1000});
      console.log(data);
      setLoved(true);
    })
    .catch(err => {
      console.log(err);      
      toast.error("Ocurrió un error al agregar a favoritos");
    })
  }

  function deleteFavorite(user:User) {
    fetch(API+"/favorite/remove",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_sub: user.google_sub,
        design_id: design.id
      })
    })
    .then(res => res.json())
    .then(data => {
      toast.success("Eliminado de favoritos",{autoClose: 1000});
      console.log(data);
      setLoved(false);
    })
    .catch(err => {
      console.log(err);      
      toast.error("Ocurrió un error al eliminar de favoritos");
    }
    )
  }


  return(
    <DesignComponentStyledContainer styleBehavior={displayStyle}>
      {displayStyle === "column" ?
        <>
          <img src={design.img_url} alt={design.name}/>
          <div className="rightSide">
            <div className="titleAndHeart">
              <h1 className="title">{design.name}</h1>
              <i onClick={onChangeLoved} className={(loved?"fi fi-ss-heart ":"fi fi-bs-heart ") + "heart"}></i>
            </div>
            <div className="btns">
              <button className="addCart"><span >Agregar al carrito</span><i className="fi fi-rr-shopping-cart"></i></button>
              <button className="buy">Comprar</button>
            </div>
          </div>
        </>
        :
        <>
          <i className={(loved?"fi fi-ss-heart ":"fi fi-bs-heart ") + "heart"} onClick={onChangeLoved}></i>
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
