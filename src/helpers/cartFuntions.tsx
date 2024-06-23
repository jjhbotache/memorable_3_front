import { toast } from "react-toastify";
import User from "../interfaces/userInterface";
import { API } from "../constants/appConstants";
import Design from "../interfaces/designInterface";

function addToCart(design: Design) {
  return new Promise((resolve, reject) => {
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
        resolve(data);
        // toast.success("Agregado al carrito, clickea para ir al carrito", {
        //   onClick: () => navigate("/cart"),
        // });
        // console.log(data);
        // setAddedToCart(true);
      })
      .catch((err) => {
        reject(err);
        // console.log(err);
        // toast.error("Ocurrió un error al agregar al carrito");
      });
  });
}

function deleteFromCart(design: Design) {
  return new Promise((resolve, reject) => {
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
        resolve(data);
        // toast.success("Eliminado del carrito", { autoClose: 1000 });
        // console.log(data);
        // setAddedToCart(false);
      })
      .catch((err) => {
        reject(err);
        // console.log(err);
        // toast.error("Ocurrió un error al eliminar del carrito");
      });
  });
}

export default function onChangeCart(addedToCart: boolean, design: Design): Promise<any> {
  return new Promise((resolve, reject) => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.google_sub) {
      toast.error("Debes iniciar sesión para poder agregar al carrito");
      reject("User not logged in");
      return;
    }

    if (addedToCart) {
      deleteFromCart(design)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      addToCart(design)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

