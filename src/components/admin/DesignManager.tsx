import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import myFetch from "../../helpers/myFetch";
import { API } from "../../constants/appConstants";
import { AddDropdown, ElementsContainer, StyledForm } from "./managerStyledComponents";

interface Desing {
  id: number;
  name: string;
  ai_url: string;
  img_url: string;
}

export default function DesignManager() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [design, setDesign] = useState<Desing[]>([]);


  function createDesign(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();


    const formData = new FormData(e.target as HTMLFormElement);
    myFetch(API+"/design/create", {
      method: "POST",
      body: formData,
      headers: {}
    })
    .then(res => res.json())
    .then(res => {
      // reset the form
      console.log(res);      
      (e.target as HTMLFormElement).reset();
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    myFetch(API+"/designs")
    .then(res => res.json())
    .then(res => {
      console.log(res);      
      setDesign(res);
    })
    .catch(err => console.log(err))
  }, []);

  function setInputName(e:ChangeEvent<HTMLInputElement>) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if(file) {
      const newName = file.name[0].toUpperCase() + file.name.slice(1).split(".")[0].replace(/-/g, " ");
      if (nameInputRef.current) {
        nameInputRef.current.value = newName;
      }
    }
  }

  function deleteDesign(id:number) {
    myFetch(API+"/design/delete/"+id, {
      method: "DELETE",
      headers: undefined,
      body: undefined
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setDesign(design.filter(d => d.id !== id));
    })
    .catch(err => console.log(err))
  }

  return(
    <>
    <AddDropdown>
    <summary>Add design</summary>
    <StyledForm onSubmit={createDesign}>
      <input type="text" placeholder="Name" name="name" ref={nameInputRef} />
      <input type="file" name="img" accept=".png" onChange={setInputName}/>
      <input type="file" name="ai" accept=".ai" />
      <button>Crear</button>
    </StyledForm>
    </AddDropdown>
    <ElementsContainer>
      {design.map(d => (
        <div key={d.id} className="row">
          <img src={d.img_url} alt={d.name} />
          <p>{d.name}</p>
          <div className="btns">
            <button onClick={()=>deleteDesign(d.id)}>Eliminar</button>
            <button disabled>Editar</button>
          </div>
        </div>
      ))}
    </ElementsContainer>
    </>
  )
};



