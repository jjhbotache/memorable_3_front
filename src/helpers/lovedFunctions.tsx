import { toast } from "react-toastify";
import { API } from "../constants/appConstants";
import User from "../interfaces/userInterface";
import Design from "../interfaces/designInterface";


export default function onChangeLoved(loved: boolean, design: Design) {
  return new Promise((resolve, reject) => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.google_sub) {
      toast.error("Debes iniciar sesión para poder agregar a favoritos");
      reject(new Error("User not logged in"));
      return;
    }

    if (loved) {
      deleteFavorite(user,design)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } else {
      addFavorite(user,design)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    }
  });
}

function addFavorite(user: User,design: Design) {
  return new Promise((resolve, reject) => {
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
        // toast.success("Agregado a favoritos. Clickea para ver tus favoritos", {
        //   onClick: () => navigate("/loved"),
        // });
        // console.log(data);
        // setLoved(true);
        resolve(data);
      })
      .catch((err) => {
        // console.log(err);
        // toast.error("Ocurrió un error al agregar a favoritos");
        reject(err);
      });
  });
}

function deleteFavorite(user: User,design: Design) {
  return new Promise((resolve, reject) => {
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
        // toast.success("Eliminado de favoritos", { autoClose: 1000 });
        // console.log(data);
        // // setLoved(false);
        resolve(data);
      })
      .catch((err) => {
        // console.log(err);
        // toast.error("Ocurrió un error al eliminar de favoritos");
        reject(err);
      });
  });
}