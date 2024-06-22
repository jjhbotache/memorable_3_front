import styled from 'styled-components';
import Navbar from '../components/global/navbar/Navbar';
import { Link, useLoaderData } from 'react-router-dom';
import Desing from '../interfaces/designInterface';
import Tag from '../interfaces/tagInterface';
import { mdScreen, primaryColor, tertiaryColor } from '../constants/styleConstants';
import { useEffect, useState } from 'react';
import formatNumber from '../helpers/formatNumber';
import { fetchSpecificExtrainfo } from '../helpers/provider';



export default function Design (){
  const {designs:design, tags: preloadedTags} = useLoaderData() as {designs:Desing, tags:Tag[]};
  const [bottlePrice, setBottlePrice] = useState<number | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [wines, setWines] = useState<string[]>([]);
  
  console.log(design, preloadedTags);
  useEffect(() => {
    Promise.all([
      fetchSpecificExtrainfo("bottle_price"),
      fetchSpecificExtrainfo("wines")
    ]).then(([bottlePrice, wines]) => {
      setBottlePrice(bottlePrice.value);
      setWines(JSON.parse(wines.value));
    });
  }, []);

  
  return (
    <StyledDesign>
      <Navbar />
      <div className="product-section">
        <div className="image-wrapper">
          <img src={design.img_url} alt="Design" />
        </div>
        <div className="details-wrapper">
          <h1 className="title">{design.name}</h1>
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
          <div className="row">
            <select className="dropdown">
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
          <div className="btns">
            <button className="button">Agregar al carro <i className="fi fi-rr-shopping-cart"/></button>
            <button className="button">Comprar</button>
          </div>
          <div className="tags">
            <span className="tag">Tag1</span>
            <span className="tag">Tag2</span>
            <span className="tag">...</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="similar-designs">
        <h2>Diseños Similares</h2>
        {/* Add similar designs here */}
      </div>
    </StyledDesign>
  );
};

const StyledDesign = styled.div`
  width: 100%;
  height: 100%;
  color: ${primaryColor};

  .product-section {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 1vw 2em;
    gap: clamp(.1em, 2vw, 2em);

    .image-wrapper {
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
    }
  
  
    .details-wrapper {
      width: 45%;
      display: flex;
      flex-direction: column;
      gap: clamp(.1em, 1vw, 2em);
      @media screen and (width < ${mdScreen}px) {
        width: 100%;
      }
      .row{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .title {
        font-size: clamp(2rem, 12vw, 3rem);
        margin-bottom: 10px;
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
        gap: clamp(.3em,2vw,2vw);
        color: ${primaryColor};
        font-size: clamp(.7rem, 3vw, 1.5rem);
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
      .btns{
        display: flex;
        gap: 1em;
        justify-content: end;
        @media screen and (width < ${mdScreen}px) {
          flex-direction: column;
          gap: 0;
        }
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
    }
  
  
  
  
  

    .tags {
      display: flex;
      margin: 10px 0;
    }
  
    .tag {
      background: #eee;
      padding: 5px 10px;
      margin-right: 5px;
      border-radius: 5px;
    }
  
    
  
  
    .similar-designs {
      margin-top: 20px;
    }
  }

`;

