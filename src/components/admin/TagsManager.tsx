import { FormEvent, useEffect, useState } from "react";
import { AddDropdown, EditorContainer, ElementsContainer, StyledForm } from "./managerStyledComponents";
import myFetch from "../../helpers/myFetch";
import { API } from "../../constants/appConstants";
import Tag from "../../interfaces/tagInterface";
import { Reorder } from "framer-motion";
import { toast } from "react-toastify";

let timeout: number;

export default function TagsManager() {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [deletingTag, setDeletingTag] = useState<null|number>(null);
  const [editingTag, setEditingTag] = useState<null|Tag>(null);



  useEffect(() => {
    fetchTags();
  }, []);

  function fetchTags() {
    setLoading(true);
    myFetch(API + "/tags")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setTags(res.sort((a:Tag, b:Tag) => (a.order||-1)-(b.order||-1)))
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  function createTag(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Creando tag");
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (typeof data.name != "string") return

    // format name to have the first letter in uppercase and the rest in lowercase
    const formattedName = (data.name[0].toUpperCase() + data.name.slice(1).toLowerCase()).trim();

    // check if the tag already exists
    if (tags.some(t => t.name === formattedName)) {
      alert("El tag ya existe");
      (e.target as HTMLFormElement).reset();
      setLoading(false);
      return;
    }

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
    if (!window.confirm("¿Estás seguro de que deseas eliminar este tag?")) {
      return;
    }
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

  function onEdit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (typeof data.name != "string") return
    const formattedName = (data.name[0].toUpperCase() + data.name.slice(1).toLowerCase()).trim();
    myFetch(API + "/tag/update", {
      method: "PUT",
      body: JSON.stringify({
        id_tag: editingTag?.id,
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
        setEditingTag(null);
      })
      .catch(err => console.log(err));
  }

  function handleReorder(newOrder: Tag[]) {
    setTags(newOrder);
    const orderToUpdate = newOrder.reduce((acc, t, i) => {
      acc[t.id] = i+1;
      return acc;
    }, {} as { [key: string]: number });
    
    debounceUpdateTagOrder(orderToUpdate);
  }

  function updateTagOrder(newOrder: { [key: string]: number }) {
    myFetch(API + "/tags/update-order", {
      method: "PUT",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        toast.dismiss();
        console.log("Order updated:", res);
        toast.success("Order updated");
      })
      .catch(err => console.log(err));
  }

  function debounce(func: (...args: any[]) => void, wait: number) {
    
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debounceUpdateTagOrder = debounce(updateTagOrder, 100);

  return(
    <>
    <AddDropdown>
    <summary>Add tag</summary>
    <StyledForm onSubmit={createTag}>
      <input type="text" placeholder="Name" name="name"/>
      <button disabled={loading!}>{loading?"Creando...":"Crear" }</button>
    </StyledForm>
    </AddDropdown>
    <small> Drag to reorder</small>
    <ElementsContainer>
      {tags.length===0 && loading? <p>Loading...</p> : tags.length===0 && <p>No tags</p>}
      <Reorder.Group axis="y" values={tags} onReorder={handleReorder} >
        {tags.map(t => (
          <Reorder.Item key={t.id} value={t} className="row">
            <p>{t.name}</p>
            <div className="btns">
              <button disabled={deletingTag===t.id} onClick={()=>deleteTag(t.id)}>Eliminar</button>
              <button onClick={()=>{setEditingTag(t)}}>Editar</button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </ElementsContainer>
    <EditorContainer 
      className="editor" 
      open={editingTag != null}
      onClick={e=>{if((e.target as HTMLDivElement).classList.contains("editor")) setEditingTag(null)}}>
      <div className="main">
        <i className="fi-rr-cross-small close" onClick={()=>setEditingTag(null)}></i>
        <p>Editar tag</p>
        <form onSubmit={onEdit}>
          <input type="text" name="name" placeholder="Name" defaultValue={editingTag?.name}/>
          <button type="submit">Editar</button>
        </form>
      </div>
    </EditorContainer>
    </>
  )
};
