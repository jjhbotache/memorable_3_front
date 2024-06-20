import styled from "styled-components";
import { primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants";

interface ArrangmentSwitchProps {
  onGrid: ()=>void;
  onColumn: ()=>void;
  arragment: "grid" | "column";
}

export default function ArrangmentSwitch({onColumn,onGrid,arragment}:ArrangmentSwitchProps) {
  return(
    <Container className="arragmentBtns" >
      <i onClick={onGrid} className={"grid fi fi-ss-apps "+(arragment==="grid" && "active")}></i>
      <i onClick={onColumn} className={"column fi fi-sr-table-list " + (arragment==="column" && "active")}></i>
      <div className="backgroundBall"></div>
    </Container>
  )
  
};


const Container = styled.div`
font-size: 1.5em;

background: ${tertiaryColor};
border: .05em solid ${primaryColor};
display: flex;
justify-content: space-between;
padding: .4em;
border-radius: 9999em;
position: relative;
box-sizing: border-box;

.backgroundBall {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  height: 86%;
  aspect-ratio: 1/1;
  background: ${primaryColor};
  border-radius: 50%;
  transition: all .3s;
  /* add a shadow inset */
  box-shadow: inset 0 0 .4em .02em black;
}

.active.grid ~ .backgroundBall{
  transform: translateY(7%) translateX(.15em);
}
.column.active ~ .backgroundBall {
  left: calc(100% - .15em);
  transform: translateY(7%) translateX(-100%);
}








i {
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  color: ${primaryColor};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all .3s;
  &.active {
    color: ${secondaryColor};
    &::before {
      transform: scale(.8);
    }
  }
}
`;