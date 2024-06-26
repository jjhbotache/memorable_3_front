import styled, { keyframes }  from 'styled-components';
import Navbar from '../components/global/navbar/Navbar';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import TagInterface from '../interfaces/tagInterface';
import { mdScreen, primaryColor, secondaryColor, tertiaryColor } from '../constants/styleConstants';
import { useEffect, useRef, useState } from 'react';
import formatNumber from '../helpers/formatNumber';
import { fetchPublicDesigns, fetchSpecificExtrainfo, sendContactForm } from '../helpers/provider';
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
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/global/Modal';
import numberVerifier from '../helpers/numberVerifier';
import { setUser } from '../redux/slices/userReducer';

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


  // bring the user global state
  const user:User = useSelector((state: any) => state.user);
  const [numberModalOpen, setNumberModalOpen] = useState<boolean>(false);
  const onResolveNumberModal = useRef<(d:string)=>void | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

  
  const navigate = useNavigate();
  const dispacher = useDispatch();
  
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
    
  // -----------------
  async function onBuy() {
    if(!wineChoosed) {
      toast.dismiss();
      toast.error("Por favor selecciona un vino");
      return;
    }
    let contactNumber:number = 0;
    if(!user.phone) {
      setNumberModalOpen(true);
      const number:string = await new Promise((resolve) => {
        onResolveNumberModal.current = (d:string) => {
          setNumberModalOpen(false);
          console.log(d);
          resolve(d);
        }
      })
      if (!numberVerifier(number) || number === "CANCELADO") {
        toast.dismiss();
        toast.error("Número de whatsapp inválido, reintenta por favor");
        return;
      }else{
        contactNumber = parseInt(number);
        if(user.google_sub){
          setLoading(true);
          toast.info("Estamos agregando tu número de whatsapp, espera un momento...");
          await fetch(API + `/user/set_number/${user.google_sub}/${contactNumber}` )
          .then((res) => res.json())
          .then((data) => {
            if(data.detail)  throw new Error(data.detail);
            console.log(data);
            toast.dismiss();
            toast.success("Número de whatsapp actualizado!");
            dispacher(setUser(
              {
                ...user,
                phone: contactNumber
              }
            ))
          })
          .catch((err) => {
            console.log(err);
            toast.error("Ocurrió un error al actualizar el número de whatsapp");
          })
          
        }
      }
    }else{
      contactNumber = parseInt(user.phone);
    }

    setLoading(true);
    fetch(API + "/whatsapp/design/response", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      to_phone: contactNumber.toString(),
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
      const {status} = JSON.parse( data.msg.replace(/'/g, '"'))
      if(status !== "0") throw new Error(data);
      toast.success("Te contactaremos a tu whatsapp para continuar con tu compra!");
      sendContactForm(
        {
          name: user ? user.name : "Alguien sin registrar",
          email: user ? user.email  : "sin email",
          subject: "Solicitud de compra exitosa",
          message: `Hola, me gustaría personalizar el diseño con id: ${design?.id} y nombre: ${design?.name}
          mi numero de whatsapp es: ${contactNumber}` 
        }
      )
    })
    .catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al solicitar la compra, puedes contactarnos directamente a nuestro whatsapp");
      sendContactForm(
        {
          name: user ? user.name : "Alguien sin registrar",
          email: user ? user.email : "sin email",
          subject: "Solicitud de compra FALLIDA",
          message: `
          Hola, me gustaría comprar el diseño con id: ${design?.id} y nombre: ${design?.name}
          mi numero de whatsapp es: ${contactNumber}
          Error: ${JSON.stringify(err)}
          `
        }
      )
    })
    .finally(() => setLoading(false));

  }

  async function onRequestEditDesign() {
    let contactNumber:number = 0;

    if(!user.phone) {
      setNumberModalOpen(true);
      const number:string = await new Promise((resolve) => {
        onResolveNumberModal.current = (d:string) => {
          setNumberModalOpen(false);
          console.log(d);
          resolve(d);
        }
      })
      if (!numberVerifier(number) || number === "CANCELADO") {
        toast.dismiss();
        toast.error("Número de whatsapp inválido, reintenta por favor");
        return;
      }else{
        contactNumber = parseInt(number);
        if(user.google_sub){
          setLoading(true);
          toast.info("Estamos agregando tu número de whatsapp, espera un momento...");
          await fetch(API + `/user/set_number/${user.google_sub}/${contactNumber}` )
          .then((res) => res.json())
          .then((data) => {
            if(data.detail)  throw new Error(data.detail);
            console.log(data);
            toast.dismiss();
            toast.success("Número de whatsapp actualizado!");
            dispacher(setUser(
              {
                ...user,
                phone: contactNumber
              }
            ))
          })
          .catch((err) => {
            console.log(err);
            toast.error("Ocurrió un error al actualizar el número de whatsapp");
          })
          
        }
      }
    }else{
      contactNumber = parseInt(user.phone);
    }



    setLoading(true);
    fetch(API + "/whatsapp/design/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to_phone:contactNumber.toString(),
        design_img_url: design?.img_url,
        design_id: design?.id,
        buy:false,
        name: user ? user.name : "",
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const {status} = JSON.parse( data.msg.replace(/'/g, '"'))
      if(status !== "0") throw new Error(data);
      toast.success("Te contactaremos a tu whatsapp para personalizar tu diseño!");
      sendContactForm(
        {
          name: user ? user.name : "Alguien sin registrar",
          email: user ? user.email  : "sin email",
          subject: "Solicitud de personalización exitosa",
          message: `Hola, me gustaría personalizar el diseño con id: ${design?.id} y nombre: ${design?.name}
          mi numero de whatsapp es: ${contactNumber}` 
        }
      )
    })
    .catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al solicitar la personalización, puedes contactarnos directamente a nuestro whatsapp");
      sendContactForm(
        {
          name: user ? user.name : "Alguien sin registrar",
          email: user ? user.email : prompt("Ingresa tu email para contactarte") || "sin email",
          subject: "Solicitud de personalización FALLIDA",
          message: `
          Hola, me gustaría personalizar el diseño con id: ${design?.id} y nombre: ${design?.name}
          mi numero de whatsapp es: ${contactNumber}
          Error: ${JSON.stringify(err)}
          `
        }
      )
    })
    .finally(() => setLoading(false));
      
  }
  // -----------------
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
            { (numberModalOpen && onResolveNumberModal.current)  && <Modal
              onResolve={onResolveNumberModal.current}
              title="Ingresa tu número de whatsapp"
              msg="Para poder contactarte y continuar el proceso, necesitamos tu número de whatsapp"
              />}
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
                
                <div className="edit" onClick={onRequestEditDesign}>
                  <i className='fi fi-sr-info'></i>
                  Te gusta pero quieres hacerle algunos cambios? Habla con nosotros!
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
              <h2 className="title">
                También te podrían gustar . . .
                <i className='fi fi-br-angle-down downArrow'></i>
              </h2>
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

const bouncingDownRow = keyframes`
  0%{
    transform: translateY(-10px);
  }
  50%{
    transform: translateY(0px);
  }
  100%{
    transform: translateY(-10px);
  }
`;



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
        box-sizing: border-box;
        i{
          box-sizing: border-box;
          background: ${secondaryColor};
          border: 1px solid ${primaryColor};
          border-radius: 50%;
          padding: .3em;
          color: ${primaryColor};
          transition: all .3s;
          cursor: pointer;
  
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
        font-size: clamp(.9em, 1.2vw, 1.2em);
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
        gap: clamp(.5em,2vw,.5em);
        color: ${primaryColor}ee;
        transition: all .3s;
        font-size: clamp(1rem, 2vw, 1.1rem) !important;
        text-decoration: underline !important;
       i{
          max-width: 1em;
       }
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
        font-size: clamp(1rem, 2vw, 1.2rem);
        color: ${primaryColor}ee;
        text-decoration: underline;
        cursor: pointer;
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
      margin: 1em -2em;
      padding: 2em 1em;
      color: ${secondaryColor};
      text-align: center;
      background: linear-gradient(
        180deg,
        ${primaryColor}00  0%,
        ${primaryColor}ee 10%,
        ${primaryColor} 50%,
        ${primaryColor}ee 90%,
        ${primaryColor}00 100%
      );

      .downArrow{
        position: absolute;
        left: 50%;
        bottom: 1em;
        transform: translateX(-50%);
        font-size: .7em;
        color: ${secondaryColor};
        transition: all .3s;
        animation: ${bouncingDownRow} 1s infinite;
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
    overflow-x: hidden;
  }

`;

