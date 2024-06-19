import styled from "styled-components"
import { mdScreen, primaryColor, tertiaryColor } from "../../../constants/styleConstants";
import UsDescription from "../../us/usDescription/UsDescription";
import WinesContainer from "../../wines/winesContainer/WinesContainer";
import ContactForm from "../../contact/ContactForm";
import { useEffect, useState } from "react";
import { API } from "../../../constants/appConstants";
import { toast } from "react-toastify";

interface Tag{
  id: number;
  name: string;
}

export default function TagsPresentation() {
 const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetchTags();
  }, [])

  function fetchTags() {
    fetch(API + "/tags")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setTags(res);
      })
      .catch(err => {
        console.error(err)
        fetchTags();
      });
  }

  return(
    <>
    <TagsDescription>
      <h1>¿Para que momento quieres tu botella memorable?</h1>
      <div className="tagsContainer">
        {
          tags.map(tag => (
            <div className="tag" key={tag.id}>
              <span>{tag.name}</span>
            </div>
          ))
          }
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
  padding: 4em .5em; 
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