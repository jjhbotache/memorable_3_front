import styled  from 'styled-components';
import Navbar from '../components/global/navbar/Navbar';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import TagInterface from '../interfaces/tagInterface';
import { mdScreen, primaryColor, secondaryColor, tertiaryColor } from '../constants/styleConstants';
import { useEffect, useState } from 'react';
import formatNumber from '../helpers/formatNumber';
import { fetchPublicDesigns, fetchSpecificExtrainfo } from '../helpers/provider';
import Tag from '../components/global/Tag';
import onChangeCart from '../helpers/cartFuntions';
import { toast } from 'react-toastify';
import User from '../interfaces/userInterface';
import onChangeLovedFunction from '../helpers/lovedFunctions';
import { levenshteinDistance } from '../helpers/orderBySimilarity';
import DesignComponent from '../components/design/designComponent/DesignComponent';
import Design from '../interfaces/designInterface';
import { API } from '../constants/appConstants';
import LoadingScreen from '../components/global/LoadingScreen';



export default function DesignElement (){
  const { id } = useParams();
  const {designs:loadedDesign} = useLoaderData() as {designs:Design};

  const [design, setDesign] = useState<Design | undefined>(loadedDesign);
  const [bottlePrice, setBottlePrice] = useState<number | undefined>();
  const [wines, setWines] = useState<string[]>([]);
  const [similarDesigns, setSimilarDesigns] = useState<Design[] | null>([]);
  
  const [wineChoosed, setWineChoosed] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [addedOnCart, setaddedOnCart] = useState<boolean>(design?.addedToCart || false);
  const [loved, setLoved] = useState<boolean>(design?.loved || false);

  const [loading, setLoading] = useState<boolean>(false);

  
  // const user: User = JSON.parse(localStorage.getItem("user") || "{}");}
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchSpecificExtrainfo("bottle_price"),
      fetchSpecificExtrainfo("wines")
    ]).then(([bottlePrice, wines]) => {
      setBottlePrice(bottlePrice.value);
      setWines(JSON.parse(wines.value));
    })
    .finally(() => setLoading(false));  

    fetchPublicDesigns()
      .then((designs:Design[]) => {
        // get the designs that have the same tags
        const similarTagsDesigns = designs.filter((d) => d.tags.some((tag:TagInterface) => loadedDesign.tags.some((t) => t.id === tag.id)));
        // designs ordered by similarity in the name according the levenshtein distance
        const similarNameDesigns = designs.sort((a,b) => {
          const distanceA = levenshteinDistance(a.name, loadedDesign.name);
          const distanceB = levenshteinDistance(b.name, loadedDesign.name);
          return distanceA - distanceB;
        }).slice(0,10);

        const similarDesigns = [...similarTagsDesigns, ...similarNameDesigns].filter((d) => d.id !== loadedDesign.id);
        console.log(similarDesigns);

        // filter the designs duplicated
        const filteredDesigns:Design[] = [];
        similarDesigns.forEach((design) => {
          if(!filteredDesigns.some((d) => d.id === design.id)) filteredDesigns.push(design);
        });
        


        setSimilarDesigns(filteredDesigns);
      })
      .catch((err) => {
        console.log(err);
        setSimilarDesigns(null);
      })
      .finally(() => setLoading(false));

  }, []);

  useEffect(() => {
    if(!id) navigate("/designs");
    console.log("id",id);
    
    setLoading(true);
    fetchPublicDesigns(parseInt(id || "0"))
      .then((design:Design) => {
        setaddedOnCart(design.addedToCart);
        setLoved(design.loved);
        setDesign(design);
        // auto scroll to top smooth
        window.scrollTo({top: 0, behavior: 'smooth'});
      })
      .catch((err) => {
        console.log(err);
        navigate("/designs");
      })
      .finally(() => setLoading(false));

  }, [id]);
    

  function onBuy() {
    if(!wineChoosed) {
      toast.dismiss();
      toast.error("Por favor selecciona un vino");
      return;
    }

    const user: User = JSON.parse(localStorage.getItem("user") || "{}");

    setLoading(true);
    fetch(API + "/whatsapp/design/response", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      to_phone: prompt("Escribe tu número de whatsapp"),
      design_img_url: design?.img_url,
      design_id: design?.id,
      quantity: quantity,
      wine: wineChoosed,
      buy: true,
      name: user ? user.name : "",
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      toast.success("Te contactaremos a tu whatsapp para finalizar la compra!");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al finalizar la compra");
    })
    .finally(() => setLoading(false));

  }
  function onRequestEditDesign() {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");

    setLoading(true);
    fetch(API + "/whatsapp/design/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to_phone:prompt("Escribe tu número de whatsapp"),
        design_img_url: design?.img_url,
        design_id: design?.id,
        buy:false,
        name: user ? user.name : "",
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      toast.success("Te contactaremos a tu whatsapp para personalizar tu diseño!");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al solicitar la personalización");
    })
    .finally(() => setLoading(false));
      
  }
  function onShare() {
    const urlToShare = window.location.href;
    const url = `https://api.whatsapp.com/send?text=${urlToShare}`
    window.open(url, "_blank");
  }
  
  function onAddToCart() {
    setLoading(true);
    onChangeCart(addedOnCart,loadedDesign)
      .then(() => {
        setaddedOnCart(!addedOnCart)
        toast.success("Agregado al carrito", {autoClose: 1000});
      })
      .catch(() => {
        toast.error("Ocurrió un error al agregar al carrito");
      })
      .finally(() => setLoading(false));
  }
  function onChangeLoved() {
    setLoading(true);
    onChangeLovedFunction(loved,loadedDesign)
      .then((data) => {
        console.log(data);
        setLoved(!loved);
        !loved
          ? toast.success("Agregado a favoritos, clickea para ver tus favoritos", { autoClose: 1000, onClick: () => navigate("/loved") })
          : toast.success("Eliminado de favoritos", { autoClose: 1000 });
      }
      )
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrió un error al agregar a favoritos");
      })
      .finally(() => setLoading(false));

  }

  return (
    <StyledDesign>
      <Navbar />
      {
        loading 
          ?<LoadingScreen/>
          :<>
            <div className="product-section">
              <div className="image-wrapper">
                <div className="icons">
                  <i onClick={onChangeLoved} className={(loved ? "fi fi-ss-heart " : "fi fi-bs-heart ") + "heart"}></i>
                  <i onClick={onShare} className="fi fi-sr-share" title='Comparte con whatsapp'></i>
                </div>
                <img src={loadedDesign.img_url} alt="Design" />
              </div>
              <div className="details-wrapper">
                <h1 className="title">{loadedDesign.name}</h1>
                <div className="tags">
                  <span className="title">Tags:</span>
                  <div className="tags-wrapper">
                    {loadedDesign.tags.map((tag: TagInterface) => (
                      <Tag key={tag.id} tag={tag} />
                    ))}
                  </div>
                </div>
                {/* quantity */}
                <div className="row">
                  <p className="price">${formatNumber(((bottlePrice || 0) * quantity))  }</p>
                  <div className="quantity-wrapper">
                    <label>Cantidad:</label>
                    <input
                      className="quantity-input"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                {/* wine */}
                <div className="row">
                  <select className="dropdown" onChange={e=>{
                    setWineChoosed(e.target.value);
                  }}>
                    <option value="">Seleccionar vino</option>
                    {wines.map((wine) => (
                      <option key={wine} value={wine}>
                        {wine}
                      </option>
                    ))}
                  </select>
                  <Link to="/wines" className="row wichToUse">
                    <i className='fi fi-sr-info'></i>
                    <p>¿Cuál debería elegir?</p>
                  </Link>
                </div>
                <div className="payment-methods">
                  <label>Métodos de pago:</label>
                  <img src="https://seeklogo.com/images/N/nequi-logo-58FBE82BA6-seeklogo.com.png" alt="" />
                  <img src="https://seeklogo.com/images/B/bancolombia-logo-932DD4816B-seeklogo.com.png" alt="" />
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/019/006/277/small_2x/money-cash-icon-png.png" alt="" />
                </div>
                <div className="edit">
                  <small onClick={onRequestEditDesign} ><i className='fi fi-sr-info'></i>Te gusta pero quieres hacerle algunos cambios? Habla con nosotros!</small>
                </div>
                <div className="btns">
                  <button onClick={onAddToCart} className="button cartBtn">
                    {addedOnCart ? "Eliminar del carrito" : "Agregar al carrito"}
                    <i className="fi fi-rr-shopping-cart"/>
                    {addedOnCart && <i className="addedIco fi fi-ss-check-circle"></i>}
                  </button>
                  <button onClick={onBuy}  className="button">Comprar</button>
                </div>
              </div>
            </div>
            <div className="similar-designs">
              <h2 className="title">Tambien te podrian gustar . . .</h2>
              {/* Add similar designs here */}
              {
                similarDesigns!==null && <>
                  {similarDesigns.map((design) => (
                    <DesignComponent displayStyle='grid' design={design} key={design.id} />
                  ))}
                </>
              }

            </div>
          </>
      }
    </StyledDesign>
  );
};

// create an animation that slides the tags to the right


const StyledDesign = styled.div`
  width: 100%;
  height: 100%;
  color: ${primaryColor};

  .product-section {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 1vw 1em;
    gap: clamp(.1em, 2vw, 2em);

    .image-wrapper {
      position: relative;
      width: 50%;
      @media screen and (width < ${mdScreen}px) {
        width: 100%;
      }

      display: grid;
      place-items: center;

      img {
        width: 100%;
        max-width:80vh;
        border-radius: 1vw;
        padding: .2em;
        border : 2px solid ${primaryColor};
  
        /* max-width: 100%; */
        aspect-ratio: 1;
      }
      .icons{
        position: absolute;
        top: .4em;
        right: 0;
        display: flex;
        gap: .2em;
        flex-direction: column;
        font-size: clamp(1.2em, 2vw, 1.8em);
        i{
          background: ${secondaryColor};
          border: 1px solid ${primaryColor};
          border-radius: 50%;
          display: grid;
          place-items: center;
          padding: .3em;
          color: ${primaryColor};
          transition: all .3s;
          cursor: pointer;
  
          &::before, &::after{
            display: grid;
            place-items: center;
          }
          &:hover{
            transform: scale(1.1);
            background: ${primaryColor};
            color: ${tertiaryColor};
          }
        }
      }


    }
  
    .details-wrapper {
      width: 45%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: clamp(.1em, 1vw, 2em);
      @media screen and (width < ${mdScreen}px) {
        width: 100%;
      }
      .tags {
        font-size: clamp(.8em, 1.2vw, .9em);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        overflow-y: visible;
        margin-bottom: 3em;

        border-top: 1px solid ${primaryColor};
        border-bottom: 1px solid ${primaryColor};
        padding: .2em 0;
        background: linear-gradient(
          180deg,
          ${tertiaryColor}  0%,
          ${tertiaryColor}dd 15%,
          ${tertiaryColor}00 50%,
          ${tertiaryColor}dd 85%,
          ${tertiaryColor} 100%
        );
        
        .title{
          font-size: 1.5em;
          font-weight: 300;
          color: ${primaryColor};
          width: auto;
          margin:0 1em;
          
        }
        .tags-wrapper{
          display: flex; 
          gap: 1em;
          flex-wrap: wrap;
          overflow-x: scroll;
          overflow-y: visible;
          width: 100%;
          padding: 0 1em;

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
      .row{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .title {
        font-size: clamp(2rem, 12vw, 3rem);
      }
      .price {
        font-size: 1.4em;
        font-weight: 200;
        color: green;
        width: 25%;
      }
      .quantity-wrapper {
        display: flex;
        align-items: center;
        margin-right: 1vw;
      }
      .wichToUse{
        margin-left: .4em;
        gap: clamp(.3em,2vw,.5em);
        color: ${primaryColor}ee;
        font-size: clamp(.8rem, 2vw, 1rem);
        transition: all .3s;
        &:hover{
          text-decoration: underline;
          text-shadow: 0 0 2px ${tertiaryColor};
          transform: scale(1.05);
        }
      }
      .quantity-input {
        width: 3em;
        margin-left: 10px;
      }
      .dropdown {
        margin: 10px 0;
        padding: 10px;
        width: 50%;
        border: 1px solid ${primaryColor};
        border-radius: 5px;
      }
      .payment-methods {
        margin: 10px 0;
        display: flex;
        align-items: center;
        gap: 1em;
        /* justify-content: space-between; */
  
        img{
          height: 2.5vw;
          width: 2.5vw;
          min-height: 25px;
          min-width: 25px;
          object-fit: contain;
          background: ${tertiaryColor}22;
          padding: .3vw;
          border-radius: .2em;
          border: 1px solid ${primaryColor};
          transition: all .1s;
          &:hover{
            transform: scale(1.1);
          }
        }
      }
      .edit{
        display:flex ;
        gap: 1em;
        align-items: center;
        justify-content: start;
        font-size: clamp(.9rem, 2vw, 1rem);
        color: ${primaryColor}ee;
        cursor: pointer;
        small{
          display: flex;
          gap: .5em;
          align-items: center;
        }
        transition: all .2s;
        &:hover{
          text-decoration: underline;
          text-shadow: 0 0 2px ${tertiaryColor};
          transform: scale(1.05);
        }
      }
      .btns{
        display: flex;
        gap: 1em;
        justify-content: end;
        margin-top: 3em;
        @media screen and (width < ${mdScreen}px) {
          flex-direction: column;
          gap: 0;
        }
        .button {
          @media screen and (width < ${mdScreen}px) {
            width: 100%;
          }
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1em;
          padding: 10px 20px;
          margin-top: 10px;
          background-color: ${tertiaryColor};
          color: ${primaryColor};
          border: 1px solid ${primaryColor};
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
            &:hover {
              background-color: ${primaryColor};
              color: ${tertiaryColor};
            }
        }
        .button[disabled]{
          background: ${tertiaryColor}44;
          color: ${primaryColor}44;
          cursor: not-allowed
        }
        .cartBtn{
          position: relative;
          .addedIco{
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 1.5em;
            background: ${secondaryColor};
            border-radius: 50%;
            color:${primaryColor}
          }
        }
      }
    }
  
    /* ------ */
  }
  .similar-designs {
    &>.title{
      position: relative;
      width: 100%;
      font-size: 2em;
      font-weight: 300;
      margin: 1em 0;
      padding: 2em 0;
      color: ${secondaryColor};
      text-align: center;
      background: linear-gradient(
        180deg,
        ${primaryColor}00  0%,
        ${primaryColor}ee 15%,
        ${primaryColor} 50%,
        ${primaryColor}ee 85%,
        ${primaryColor}00 100%
      );
      &::after{
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(
          90deg,
          ${secondaryColor}  0%,
          ${secondaryColor}11 5%,
          ${secondaryColor}00 50%,
          ${secondaryColor}11 95%,
          ${secondaryColor} 100%
        );
      }
    }
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: .5vw;
    justify-content: space-evenly;
    padding: 0 1vw;
    box-sizing: border-box;
  }

`;

