import { useState, forwardRef, ForwardedRef } from "react";
import Design from "../../../interfaces/designInterface";
import { DesignComponentStyledContainer } from "./designComponentStyledComponents";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import onChangeCartFunction from "../../../helpers/cartFuntions";
import onChangeLovedFunction from "../../../helpers/lovedFunctions";

interface DesignComponentProps {
  displayStyle: "grid" | "column";
  design: Design;
}

const DesignComponent = forwardRef(({ displayStyle, design }: DesignComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [loved, setLoved] = useState<boolean>(design.loved || false);
    const [addedToCart, setAddedToCart] = useState<boolean>(design.addedToCart || false);
    const navigate = useNavigate();

    function onChangeLoved() {
      onChangeLovedFunction(loved,design)
        .then((data) => {
          console.log(data);
          setLoved(!loved);
          !loved
            ? toast.success("Agregado a favoritos, clickea para ver tus favoritos", { autoClose: 1000, onClick: () => navigate("/loved") })
            : toast.success("Eliminado de favoritos", { autoClose: 1000 });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ocurrió un error al agregar a favoritos");
        });
    }

    function onChangeCart() {
      onChangeCartFunction(addedToCart, design)
        .then((data) => {
          console.log(data);
          const newCartValue = !addedToCart;
          setAddedToCart(newCartValue);
          newCartValue
            ? toast.success("Agregado al carrito, clickea para ir al carrito", {onClick: () => navigate("/cart")})
            : toast.success("Eliminado del carrito", { autoClose: 1000 })
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ocurrió un error al agregar al carrito");
        })
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
          <i className="fi fi-rr-shopping-cart"/>
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
