import { useDispatch } from "react-redux";
import TagInterface from "../../interfaces/tagInterface";
import styled from "styled-components";
import { setFilter } from "../../redux/slices/filterReducer";
import { useNavigate } from "react-router-dom";
import { mdScreen, primaryColor, tertiaryColor } from "../../constants/styleConstants";

interface TagProps {
  tag:TagInterface;
}
export default function Tag({tag}:TagProps) {
  const dispacher = useDispatch();
  const navigate = useNavigate();

  function onTagClicked() {
    dispacher(setFilter({name: "",tags: [tag]}))
    navigate("/designs");
  }
    

  return (
    <Container onClick={onTagClicked}>
      <div className="tag">
        <span>{tag.name}</span>
      </div>
    </Container>
  );
  
};

const Container = styled.div`
  .tag{
    font-size: .8em;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${tertiaryColor};
    border: 1px solid ${primaryColor};
    border-radius: 99999em;
    padding: .3em .5em;
    font-weight: 300;
    cursor: pointer;
    transition: .1s;

    &:hover{
      background: ${primaryColor};
      color: ${tertiaryColor};
      transform: scale(1.1);
      box-shadow: 0 0 10px 0 ${primaryColor};
    };
  }
`;
