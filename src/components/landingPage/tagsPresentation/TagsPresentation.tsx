import styled from "styled-components"
import { mdScreen, primaryColor, tertiaryColor } from "../../../constants/styleConstants";
import UsDescription from "../../us/usDescription/UsDescription";
import WinesContainer from "../../wines/winesContainer/WinesContainer";
import ContactForm from "../../contact/ContactForm";
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
//  const [tags, setTags] = useState<Tag[]>([]);
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
          {
            tags.map(tag => (
              <div className="tag" key={tag.id} onClick={()=>onChosedTag(tag)}>
                <span>{tag.name}</span>
              </div>
            ))
            }
            <div className="tag" onClick={()=>onChosedTag()}>
              <span>Déjame ver diseños . . .</span>
            </div>
        </div>
      </div>
      <div className="extraInfo">
        <div className="divider"/>
        <UsDescription/>
        <div className="divider"/>
        <WinesContainer/>
        <div className="divider"/>
        <ContactForm/>
      </div>
    </TagsDescription>  
    </>
  )
};


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
    background: rgba(255,255,255,.2);
    overflow: hidden;
    
    }
  .mainTagsDescription{
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }


  h1{
    font-size: 3em;
    font-weight: 300;
    color: ${primaryColor};
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
    background: ${tertiaryColor};
    border: 1px solid ${primaryColor};
    padding: .3em .5em;
    font-size: 1.2em;
    border-radius: 99999px;
    font-weight: 300;
    cursor: pointer;
    transition: .1s;

    &:hover{
      background: ${primaryColor};
      color: ${tertiaryColor};
      transform: scale(1.3);
    };
  }
  .extraInfo{
    display: none;
    @media screen and (width < ${mdScreen}px){
      display: flex;
      flex-direction: column;
      gap: 1em;
      align-items: center;
      text-align: center;
    }

    .divider{
      width: 80%;
      height: 1px;
      background: ${primaryColor};
    }
  }
`;