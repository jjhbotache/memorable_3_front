import styled from "styled-components"
import WinesContainer from "../components/wines/winesContainer/WinesContainer";

export default function Wines() {
  return(<>
    <WinesComponent>
      <div className="wines">
        <WinesContainer/>
      </div>
    </WinesComponent>
  </>
  )
};

const WinesComponent = styled.div`
  background-color: var(--secondaryColor);
  .wines{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;