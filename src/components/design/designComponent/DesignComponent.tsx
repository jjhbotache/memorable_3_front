import { useState, forwardRef, ForwardedRef } from "react";
import Desing from "../../../interfaces/designInterface";
import { DesignComponentStyledContainer } from "./designComponentStyledComponents";
import { API } from "../../../constants/appConstants";
import { toast } from "react-toastify";
import User from "../../../interfaces/userInterface";
import { useNavigate } from "react-router-dom";

interface DesignComponentProps {
  displayStyle: "grid" | "column";
  design: Desing;
}

const DesignComponent = forwardRef(
  ({ displayStyle, design }: DesignComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [loved, setLoved] = useState<boolean>(design.loved || false);
    const [addedToCart, setAddedToCart] = useState<boolean>(design.addedToCart || false);
    const navigate = useNavigate();

    function onChangeLoved() {
      const user: User = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.google_sub) {
        toast.error("Debes iniciar sesión para poder agregar a favoritos");
        return;
      }

      if (loved) {
        deleteFavorite(user);
      } else {
        addFavorite(user);
      }
    }

    function addFavorite(user: User) {
      fetch(API + "/favorite/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_sub: user.google_sub,
          design_id: design.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Agregado a favoritos. Clickea para ver tus favoritos", {
            onClick: () => navigate("/loved"),
          });
          console.log(data);
          setLoved(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ocurrió un error al agregar a favoritos");
        });
    }

    function deleteFavorite(user: User) {
      fetch(API + "/favorite/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_sub: user.google_sub,
          design_id: design.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Eliminado de favoritos", { autoClose: 1000 });
          console.log(data);
          setLoved(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ocurrió un error al eliminar de favoritos");
        });
    }

    function onChangeCart() {
      const user: User = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.google_sub) {
        toast.error("Debes iniciar sesión para poder agregar al carrito");
        return;
      }

      if (addedToCart) {
        deleteFromCart();
      } else {
        addToCart();
      }
    }

    function addToCart() {
      fetch(API + "/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_sub: JSON.parse(localStorage.getItem("user") || "{}").google_sub,
          design_id: design.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Agregado al carrito, clickea para ir al carrito", {
            onClick: () => navigate("/cart"),
          });
          console.log(data);
          setAddedToCart(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ocurrió un error al agregar al carrito");
        });
    }

    function deleteFromCart() {
      fetch(API + "/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_sub: JSON.parse(localStorage.getItem("user") || "{}").google_sub,
          design_id: design.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Eliminado del carrito", { autoClose: 1000 });
          console.log(data);
          setAddedToCart(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ocurrió un error al eliminar del carrito");
        });
    }

    // reusable mini components
    const Heart = () => (
      <i onClick={onChangeLoved} className={(loved ? "fi fi-ss-heart " : "fi fi-bs-heart ") + "heart"}></i>
    );
    const Img = () => <img src={design.img_url} alt={design.name} onClick={()=>navigate("/designs/"+design.id)} />;
    const Title = () => <h1 className="title">{design.name}</h1>;
    const BuyButtons = () => (
      <div className="btns">
        <button onClick={onChangeCart} className="addCart">
          <span>Agregar al carrito</span>
          <i className="fi fi-rr-shopping-cart"></i>
          {!!addedToCart && <i className="addedIco fi fi-ss-check-circle"></i>}
        </button>
        <button className="buy">Comprar</button>
      </div>
    );

    return (
      <DesignComponentStyledContainer $styleBehavior={displayStyle} ref={ref}>
        {displayStyle === "column" ? (
          <>
            <Img />
            <div className="rightSide">
              <div className="titleAndHeart">
                <Title />
                <Heart />
              </div>
              <BuyButtons />
            </div>
          </>
        ) : (
          <>
            <Heart />
            <Img />
            <Title />
            <BuyButtons />
          </>
        )}
      </DesignComponentStyledContainer>
    );
  }
);

export default DesignComponent;
