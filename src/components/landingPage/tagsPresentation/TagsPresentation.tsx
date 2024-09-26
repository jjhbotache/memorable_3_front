import styled from "styled-components"
import { mdScreen } from "../../../constants/styleConstants";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../redux/slices/filterReducer";
import { useNavigate } from "react-router-dom";

interface Tag{
  id: number;
  name: string;
}

interface Props{
  preloadedTags?: Tag[];
}

export default function TagsPresentation({preloadedTags}:Props) {
  const tags = preloadedTags || [];
 const dispacher = useDispatch();
 const navigate = useNavigate();


  function onChosedTag(tag?:Tag){
    if(!tag){
      dispacher(
        setFilter({
          name: "",
          tags: []
        })
      )
      navigate("/designs");
      return;
    }
    dispacher(
      setFilter({
        name: "",
        tags: [tag]
      })
    )
    navigate("/designs");
  }

  return(
    <>
    <TagsDescription>
      <div className="mainTagsDescription">
        <h1>¿&nbsp;Qué momento te gustaría hacer <br/><span style={{fontFamily:"Hellovalentina"}}>{" Memorable "}</span>?</h1>
        <div className="tagsContainer">
            <div className="tag" onClick={()=>onChosedTag()}>
              <span>Dejame ver todos ! ! !</span>
            </div>
            {
            tags.map(tag => (
              <div className="tag" key={tag.id} onClick={()=>onChosedTag(tag)}>
                <span>{tag.name}</span>
              </div>
            ))
            }
        </div>
      </div>
    </TagsDescription>  
    </>
  )
}


const TagsDescription = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1em;
  padding: 1em .5em; 
  box-sizing: border-box;
  min-width: 50%;
  width: 550px;
  margin: 0;
  z-index: 2;
  box-shadow: -20px 0 50px rgba(0,0,0,.5);
  @media screen and (max-width: ${mdScreen}px){
    box-shadow: 0px 0 50px rgba(0,0,0,.5);
    overflow: hidden;
    
    }
  .mainTagsDescription{
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    backdrop-filter: blur(2px);
  }


  h1{
    font-size: 3em;
    font-weight: 300;
    text-align: center;
  }
  .tagsContainer{
    display: flex;
    justify-content: center;
    gap: 2em;
    flex-wrap: wrap;
    z-index: 2;
    padding: 0 1em;
    padding-bottom: 2em;
  }
  .tag{
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--tertiaryColor);
    color: var(--primaryColor);
    border: none;
    padding: .3em .5em;
    font-size: 1.2em;
    border-radius: 99999px;
    font-weight: 300;
    cursor: pointer;
    transition: .2s;
    box-sizing: border-box;

    &:hover{
      transform: scale(1.3);
      box-shadow: 0 0 10px rgba(0,0,0,.5);
      border: none;
    };
    &:active{
      transform: scale(.9);
      box-shadow: 0 0 10px rgba(0,0,0,.5) inset;
    }

  }
  
`;