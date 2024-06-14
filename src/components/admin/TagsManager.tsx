import { FormEvent, useEffect, useState } from "react";
import { AddDropdown, ElementsContainer, StyledForm } from "./managerStyledComponents";
import myFetch from "../../helpers/myFetch";
import { API } from "../../constants/appConstants";

interface Tag {
  id: number;
  name: string;
}

export default function TagsManager() {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [deletingTag, setDeletingTag] = useState<null|number>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  function fetchTags() {
    myFetch(API + "/tags")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setTags(res);
      });
  }

  function createTag(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Creando tag");
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (typeof data.name != "string") return

    // format name to have the first letter in uppercase and the rest in lowercase
    const formattedName = (data.name[0].toUpperCase() + data.name.slice(1).toLowerCase()).trim();
    myFetch(API + "/tag/create", {
      method: "POST",
      body: JSON.stringify({
        id_tag: 0,
        name: formattedName
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        fetchTags();
        // reset the form
        (e.target as HTMLFormElement).reset();
        
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  function deleteTag(id:number) {
    setDeletingTag(id);
    myFetch(API + "/tag/delete", {
      method: "DELETE",
      body: JSON.stringify({id_tag: id, name: ""}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        fetchTags();
      })
      .catch(err => console.log(err))
      .finally(() => setDeletingTag(null));
  }

  return(
    <>
    <AddDropdown>
    <summary>Add tag</summary>
    <StyledForm onSubmit={createTag}>
      <input type="text" placeholder="Name" name="name"/>
      <button disabled={loading!}>{loading?"Creando...":"Crear" }</button>
    </StyledForm>
    </AddDropdown>
    <ElementsContainer>
      {tags.length===0 && <p>No hay tags</p>}
      {tags.map(t => (
        <div key={t.id} className="row">
          <p>{t.name}</p>
          <div className="btns">
            <button disabled={deletingTag===t.id} onClick={()=>deleteTag(t.id)}>Eliminar</button>
            <button disabled>Editar</button>
          </div>
        </div>
      ))}
    </ElementsContainer>
    </>
  )
};
