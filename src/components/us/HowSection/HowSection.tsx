import { mdScreen } from "../../../constants/styleConstants";
import { HowSectionStyledComponent } from "./HowSectionStyledComponents";

export default function HowSection() {



  return(
    <HowSectionStyledComponent>
      {/* presentation video */}
      <section className="mainVideo">
        <div className="topGradient"/>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="var(--secondaryColor)"
            fillOpacity="1"
            d="M0,128L48,117.3C96,107,192,85,288,106.7C384,128,480,192,576,197.3C672,203,768,149,864,144C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            data-darkreader-inline-fill=""
          ></path>
        </svg>
        <div className="videoContainer">
          <video autoPlay muted loop controls preload="auto" >
            <source src={
              window.innerWidth > mdScreen 
                ?"https://res.cloudinary.com/db8fpml9m/video/upload/v1727493030/memorable_presentacion_cuadrado_1_tzbjge.mp4"
                :"https://res.cloudinary.com/db8fpml9m/video/upload/v1727493029/memorable_presentacion_rectangulo_1_yy0id1.mp4"
            } type="video/mp4" />
          </video>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="var(--secondaryColor)"
            fillOpacity="1"
            d="M0,128L48,117.3C96,107,192,85,288,106.7C384,128,480,192,576,197.3C672,203,768,149,864,144C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            data-darkreader-inline-fill=""
          ></path>
        </svg>
        <div className="bottomGradient"/>
      </section>

      <section className="mainText">
        <h2>Se único, se <span>memorable</span></h2>
        <p>
          En Memorable creamos botellas, que cuentan historias, que se convierten en regalos inolvidables, con tu toque personal.
        </p>
      </section>

      <hr className="divider" />

      <section className="mainSteps">
        <h2>Encuentra tu botella!</h2>
        <div className="steps">
          <div className="step1">
            <div>
              <h3>1. Encuentra tu diseño</h3>
              <p>
                Ve a la sección de diseños y utiliza los filtros y la barra de búsqueda para encontrar el diseño que más te guste.
                Puedes filtrar por la situación, como cumpleaños, aniversario, día de la madre, etc.
                <br />
                Y como si fuera sufiiciente, puedes usar la barrar de búsqueda, que utiliza inteligencia artificial para buscar diseños que te puedan gustar.
              </p>
            </div>
            <video controls autoPlay muted preload="auto" loop>
              <source src={
                window.innerWidth > mdScreen
                ?"https://res.cloudinary.com/db8fpml9m/video/upload/v1727499663/paso_1_-_busca_-_horizontal_1_hh4nwg.mp4"
                :"https://res.cloudinary.com/db8fpml9m/video/upload/v1727500448/paso_1_-_busca_-_vertical_1_wggqql.mp4"
              } type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
          <div className="step2">
            <video controls autoPlay muted preload="auto" loop>
              <source src={
                window.innerWidth > mdScreen
                ?"https://res.cloudinary.com/db8fpml9m/video/upload/v1727498514/paso_2_-_modifica_-_horizontal_n9mjpq.mp4"
                :"https://res.cloudinary.com/db8fpml9m/video/upload/v1727498525/paso_2_-_modifica_-_vertical_ybvdwu.mp4"
              } type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
            <div>
              <h3>2. Personaliza tu botella</h3>
              <p>
                Luego que hayas encontrado tu diseño, puedes personalizarlo a tu gusto.
                Da click en el diseño y en la página del diseño, verás un link en el que puedes contactar al diseñador para hacer cambios en el diseño, o simplemente, darle a comprar para indicarnos que quieres el diseño tal cual.
              </p>
            </div>
          </div>
        </div>
      </section>  

      <section className="finalProduct">    
        <h2>Disfruta</h2>
        <p>
          Si te encuentras en la ciudad de Ibagué, puedes recibir tu botella con un empaque especial y en la puerta de tu casa.
        </p>
        <video autoPlay muted preload="auto" loop>
          <source src="https://res.cloudinary.com/db8fpml9m/video/upload/v1727498568/resultado_regional_1_xfecug.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>

        <hr className="divider" />

        <p>
          Para el resto del país, te enviaremos tu botella en una empaque especial, para que la recibas en la puerta de tu casa.
        </p>
        <video autoPlay muted preload="auto" loop>
          <source src="https://res.cloudinary.com/db8fpml9m/video/upload/v1727498564/resultado_nacional_1_thphxx.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </section>
    </HowSectionStyledComponent>
  ) 
}
