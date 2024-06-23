import { StyledWinesContainer } from "./winesContainerStyledComponents"
import merlot from "../../../assets/imgs/wines/merlot.png"
import moscatel from "../../../assets/imgs/wines/moscatel.png"
import cabernetSuavignon from "../../../assets/imgs/wines/cabernet-suavignon.png"

export default function WinesContainer() {
  /*
  🍇Cabernet Suavingnon (SECO)
  🍇Merlot (SEMISECO)
  🍇Moscatel (DULCE)
  */ 
  const winesInfo = [
    {
      name: "Merlot",
      description: "Este es un vino joven, elegante, versátil y frutal. Si estás iniciando en el mundo del vino, esta sería una muy buena opción. Excelente acompañado con Pollo, Quesos, Legumbres y platillos con Arroz.",
      img: merlot,
      wineKind: "Semi - seco",
    },
    {
      name: "Moscatel",
      description: "Alegre y dulce como su tierra natal: Colombia. Este vino floral será suave con tu paladar, perfecto y ligero. Este vino suele acompañar ensaladas, aperitivos o entrada.",
      img: moscatel,
      wineKind: "Dulce",
    },
    {
      name: "Cabernet Sauvignon",
      description: "Si eres de los que prefieres sabores intensos, este es el tuyo. Su sabor a chocolate amargo, pimienta y toques herbales acompañarán perfecto platos con sabores fuertes. Disfrútalo solo, o si prefieres con Carnes Rojas y Quesos grasos.",
      img: cabernetSuavignon,
      wineKind: "Seco",
    }
  ];
  

  return(
    <StyledWinesContainer>
      <h1 className="pageTitle">Vinos</h1>
      {
        winesInfo.map((wine, index) => {
          return(
            <div key={index} className="wineRow">
              <div>
                <h1>{wine.name}</h1>
                <small>{wine.wineKind}</small>
              </div>
              <div className="imgContainer">
                <img src={wine.img} alt={wine.name}/>
              </div>
              <p>{wine.description}</p>
            </div>
          )
        })
      }
    </StyledWinesContainer>
  )
};
