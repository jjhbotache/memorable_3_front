import styled from "styled-components"
import { secondaryColor } from "../constants/styleConstants";
import Navbar from "../components/global/navbar/Navbar";
import WinesContainer from "../components/wines/winesContainer/WinesContainer";
import Footer from "../components/global/Footer";

export default function Wines() {
  return(<>
    <WinesComponent>
      <Navbar/>
      <div className="wines">
        <WinesContainer/>
      </div>
      <Footer/>
    </WinesComponent>
  </>
  )
};

const WinesComponent = styled.div`
  background-color: ${secondaryColor};
  .wines{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;