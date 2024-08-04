import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import myFetch from "../../helpers/myFetch";
import { API } from "../../constants/appConstants";
import { AddDropdown, EditorContainer, ElementsContainer, StyledForm } from "./managerStyledComponents";
import Tag from "../../interfaces/tagInterface";
import Design from "../../interfaces/designInterface";
import { toast } from "react-toastify";
import { downloadImgWithFetch } from "../../interfaces/downloadImg";




export default function DesignManager() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [designsToShow, setDesignsToShow] = useState<Design[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingDesign, setDeletingDesign] = useState<null|number>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingDesign, setEditingDesign] = useState<null|Design>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);


 
  async function loadDesgins() {
    myFetch(API + "/designs")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setDesigns(res);
        setDesignsToShow(res);
      })
      .catch(err => {
        console.log(err)
        loadDesgins()
      });
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
      toast.success("Diseño creado");
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
      setDesigns(designs.filter(d => d.id !== id));
      toast.success("Diseño eliminado");
    })
    .catch(err => console.log(err))
    .finally(() => setDeletingDesign(null));
  }

  function onEdit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    interface CustomFormData {
      name: string;
      img?: File;
      ai?: File;
      tags: Tag[];
    }
    const formData = new FormData(e.currentTarget);
    const data:CustomFormData = {
      name: formData.get("name") as string,
      tags: tags.filter(t => formData.getAll("tags").includes(t.id.toString())),
      img: formData.get("img") as File,
      ai: formData.get("ai") as File,
    };
    console.log(data);
    // if the img doesn't exists, remove it from the data
    
    if(data.img?.name === "") delete data.img;
    if(data.ai?.name === "") delete data.ai;
    
    // create a new form data
    const newFormData = new FormData();
    newFormData.append("name", data.name);
    if(data.img) newFormData.append("img", data.img);
    if(data.ai) newFormData.append("ai", data.ai);
    newFormData.append("tags_in_string", data.tags.map(t => t.id).join(","));

    setLoading(true);
    const updatedFormData = new FormData();
    updatedFormData.append("id_design", editingDesign?.id.toString() || "");
    for (const [key, value] of newFormData.entries()) {
      updatedFormData.append(key, value);
    }
    
    myFetch(API+"/design/update", {
      method: "PUT",
      body: updatedFormData,
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      loadDesgins();
      setEditingDesign(null);
      toast.success("Diseño editado");
      searchInputRef.current && (searchInputRef.current.value = "");
      // reset form
      (e.target as HTMLFormElement).reset();

    })
    .catch(err => {
      console.log(err)
      toast.error("Error al editar el diseño")
    })
    .finally(() => setLoading(false));
  }
  
  function onFilter(e:ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setDesignsToShow(designs.filter(d => d.name.toLowerCase().includes(value.toLowerCase())));
  }

  function downloadImg(d:Design) {
    downloadImgWithFetch(d.img_url, d.name.toLowerCase().replace(/ /g, "_"))
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
      <input type="text" onChange={onFilter} className="searcher" placeholder="Search your design" ref={searchInputRef}/>
    {designsToShow.length===0 && loading? <p>Loading...</p> : designsToShow.length===0 && <p>No hay disños para mostrar</p>}
      {designsToShow.map(d => (
        <div key={d.id} className="row">
          <img src={d.img_url} alt={d.name} />
          <p>{d.name}</p>
          {/* tags */}
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
            <a href={d.ai_url} download={d.name.toLowerCase().replace(/ /g, "_")}>AI</a>
            <button onClick={()=>downloadImg(d)}>PNG</button>
            <button onClick={()=>{setEditingDesign(d)}}>Editar</button>
          </div>
        </div>
      ))}
    </ElementsContainer>
    <EditorContainer 
      className="editor" 
      open={editingDesign != null}
      onClick={e=>{if((e.target as HTMLDivElement).classList.contains("editor")) setEditingDesign(null)}}>
      <div className="main">
        <i className="fi-rr-cross-small close" onClick={()=>setEditingDesign(null)}></i>
        <h1>Editar Diseño</h1>
        <form onSubmit={onEdit}>
          <label htmlFor="name">Nombre del diseño</label>
          <input className="required" type="text" name="name" placeholder="Name" defaultValue={editingDesign?.name}/>
          <img src={editingDesign?.img_url}/>
          <label htmlFor="img">Imagen</label>
          <input type="file" name="img" accept=".png" onChange={setInputName}/>
          <label htmlFor="ai">Adobe illustrator file</label>
          <input type="file" name="ai" accept=".ai" />
          <hr className="divider"/>
          <p>Tags</p>
          {/* create a list of checkboxes for each tag */}
          {tags.map(t => (
            <label key={t.id}>
              <input type="checkbox" name="tags" value={t.id} defaultChecked={editingDesign?.tags?.some(tag => tag.id === t.id)} />
              {t.name}
            </label>
          ))}

          <button type="submit" disabled={loading}>{loading?"editando...":"editar"}</button>
        </form>
      </div>
    </EditorContainer>
    </>
  )
};



