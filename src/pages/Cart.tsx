import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import Design from "../interfaces/designInterface";
import { API } from "../constants/appConstants";
import { useNavigate } from "react-router-dom";
import DesignsContainer from "../components/design/designContainer/DesignContainer";
import ArrangmentSwitch from "../components/design/arrangmentSwitch/ArrangmentSwitch";
import myFetch from "../helpers/myFetch";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/slices/filterReducer";
import SimpleSpinner from "../components/global/SimpleSpinner";
import { fetchSpecificExtrainfo } from "../helpers/provider";

export default function Cart() {
  const [cartDesigns, setlovedDesigns] = useState<Design[] | undefined>(undefined);

  const [arragment, setArragment] = useState<"column" | "grid">("column");
  const navigate = useNavigate();
  const dispacher = useDispatch();
  const [phone, setPhone] = useState("");

  const fetchAddedToCart = useCallback(() => {
    myFetch(API+"/designs/public")
      .then(res=>res.json())
      .then((data:Design[]) => {
        console.log(data);
        data = data.filter(design => design.addedtocart)
        
        setlovedDesigns(data)
      })
      .catch(e=>{
        console.log(e);
        setTimeout(() => {
          fetchAddedToCart()
        }, 1000)
      })
},[])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if(!user.google_sub) {
      toast.error("Debes iniciar sesión para poder ver tu carrito");
      navigate("/login")
    }
    // get the loved designs
    fetchAddedToCart();
    dispacher(
      setFilter({
        name: "",
        tags: [],
      })
    )

    async function main(){
      const {value:whatsappPhone} = await fetchSpecificExtrainfo("whatsapp_phone");
      setPhone(whatsappPhone);
      // setUrl(`https://api.whatsapp.com/send?phone=57${whatsappPhone}&text=${text}`);
    }
    main();

  }, [navigate,dispacher,fetchAddedToCart]);

  const openWhatsAppChat = useCallback(() => {
    if (!cartDesigns) return;
    // creates a msg to send to the whatsapp chat
    const msg = "Hola, me gustaría comprar las siguientes botellas: /";
    const designs = cartDesigns.map(design => design.name).join(" / ");
    const finalMsg = msg + designs;
    // opens the chat
    window.open(
      `https://api.whatsapp.com/send?phone=57${phone}&text=${finalMsg}`,
      "_blank"
    );
    
  }, [cartDesigns, phone]);

  return(
    <Container>
      <div className="main">
      <h1 className="pageTitle">Mis carrito</h1>
      <div className="swithContainer">
        <ArrangmentSwitch arragment={arragment} onColumn={() => setArragment("column")} onGrid={() => setArragment("grid")} />
      </div>
      { 
        cartDesigns
        ? (
          <>
          <DesignsContainer designs={cartDesigns} arragment={arragment} />
          {cartDesigns.length > 1 && (
            <button className="buyBottlesBtn" onClick={openWhatsAppChat}>
              <small>contáctanos para</small>
              comprar
            </button>
          )}
          </>
        )
        : <SimpleSpinner />
      }
      </div>
    </Container>
  )

  
}


const Container = styled.div`
  color: var(--primaryColor);
  background-color: var(--secondaryColor);
    .main{
       .pageTitle{
        font-family: "Hellovalentina";
        font-size: 4em;
        font-weight: 300;
      }
      .swithContainer{
        max-width: 100px;
      }
      padding: 1em .2em;
      display: flex;
      flex-direction: column;
      gap: 1em;
      height: 100%;
      min-height: 95vh;

      .loaderContainer{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-top: clamp(2em, 20vh, 20em);
      }

      .buyBottlesBtn{
        font-family: "Hellovalentina";
        font-size: 4em;
        padding: .2em .5em;
        background-color: var(--secondaryColor);
        border: 2px solid var(--primaryColor);
        color: var(--primaryColor);
        border-radius: 10px;
        cursor: pointer;
        transition: .3s;
        max-width: 300px;
        margin: 0 auto;
        box-sizing: border-box;

        small{
          display: block;
          font-size: .2em;
          font-family: "Montserrat";
          font-weight: 400;
        }

        &:hover{
          background-color: var(--primaryColor);
          color: var(--secondaryColor);
        }
      }
    }
  `;