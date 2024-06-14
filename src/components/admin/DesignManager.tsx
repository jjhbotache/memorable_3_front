import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import myFetch from "../../helpers/myFetch";
import { API } from "../../constants/appConstants";
import { AddDropdown, ElementsContainer, StyledForm } from "./managerStyledComponents";

interface Desing {
  id: number;
  name: string;
  ai_url: string;
  img_url: string;
  tags: Tag[];
}

interface Tag {
  id: number;
  name: string;
}

export default function DesignManager() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [design, setDesign] = useState<Desing[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingDesign, setDeletingDesign] = useState<null|number>(null);
  const [tags, setTags] = useState<Tag[]>([]);


 
  async function loadDesgins() {
    myFetch(API + "/designs")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setDesign(res);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    const main = async ()=>{
      await loadDesgins();
      await myFetch(API + "/tags")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setTags(res);
      })
    }
    main();
    

    
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

  function createDesign(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();


    const formData = new FormData(e.target as HTMLFormElement);
    // print all the data to send
    const tags = formData.getAll("tags");
    const stringTags = tags?.join(",");
    formData.append("tags_in_string", stringTags!);
    setLoading(true);
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
      // reload the designs
      loadDesgins();

    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  }

  function deleteDesign(id:number) {
    setDeletingDesign(id);
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
    .finally(() => setDeletingDesign(null));
  }

  return(
    <>
    <AddDropdown>
    <summary>Add design</summary>
    <StyledForm onSubmit={createDesign}>
      <input type="text" placeholder="Name" name="name" ref={nameInputRef} />
      <input type="file" name="img" accept=".png" onChange={setInputName}/>
      <input type="file" name="ai" accept=".ai" />

      <hr className="divider" />
      <p>Tags</p>
      {/* create a list of checkboxes for each tag */}
      {tags.map(t => (
        <label key={t.id}>
          <input type="checkbox" name="tags" value={t.id} />
          {t.name}
        </label>
      ))}

      <button disabled={loading!}>{loading?"Creando...":"Crear" }</button>
    </StyledForm>
    </AddDropdown>
    <ElementsContainer>
      {design.length===0 && <p>No hay diseños</p>}
      {design.map(d => (
        <div key={d.id} className="row">
          <img src={d.img_url} alt={d.name} />
          <p>{d.name}</p>
          {/* taags */}
          <details>
            <summary>Tags</summary>
            <div className="floatingContent">
              <ul>
                {d.tags?.map((t:Tag) => (
                  <li key={t.id}>{t.name}</li>
                ))}
              </ul>
            </div>
          </details>
          <div className="btns">
            <button disabled={deletingDesign===d.id} onClick={()=>deleteDesign(d.id)}>Eliminar</button>
            <a href={d.ai_url} download>Descargar AI</a>
            <button disabled>Editar</button>
          </div>
        </div>
      ))}
    </ElementsContainer>
    </>
  )
};



