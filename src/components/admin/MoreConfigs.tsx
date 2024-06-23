import styled from "styled-components"
import { primaryColor, secondaryColor } from "../../constants/styleConstants";
import myFetch from "../../helpers/myFetch";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useRef, useState } from "react";
import { API } from "../../constants/appConstants";
import { fetchExtraInfo } from "../../helpers/provider";

export default function MoreConfigs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [extraInfos, setExtraInfos] = useState<ExtraInfo[]>([]);
  const [editingExtrainfo, setEditingExtrainfo] = useState<boolean>(false);

  const formExtrainfoRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchAndSetExtraInfo();
  }, []);


  function fetchAndSetExtraInfo() {
    fetchExtraInfo().then(res => {
      setExtraInfos(res);
    });
  }

  function exportDb() {
    setLoading(true);
    myFetch(API + "/db/export")
    .then(res => res.blob())
    .then(blob => {
      console.log(blob);
      
      // download file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.db';
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Base de datos exportada");


    })
    .catch(err => {
      console.error(err);
      toast.error("Error al exportar la base de datos");
    })
    .finally(() => setLoading(false));

  }

  function importDb(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("db") as File;
    const existFile =  !!file.name;
    if (existFile) {
      const formData = new FormData();
      formData.append("db_file", file);
      setLoading(true);
      myFetch(API + "/db/import", {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        form.reset();
        toast.success("Base de datos importada");
      })
      .catch(err => {
        console.error(err);
        toast.error("Error al importar la base de datos");
      })
      .finally(() => setLoading(false));
    }else{
      toast.error("Debes seleccionar un archivo");
    }
  }
    
  function createOrUpdateExtraInfo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    
    const form = e.currentTarget;
    const data = new FormData(form);
    let name = data.get("name") as string;
    let value = data.get("value") as string;
    name = encodeURIComponent(name);
    value = encodeURIComponent(value);
    console.log(name, value);
    
    

    console.log(name, value);
    


    if (name && value) {
      setLoading(true);
      myFetch(API + `/extra_info/${editingExtrainfo?"update":"create"}/`+name+"/"+value, {method:editingExtrainfo?"PUT":"POST"})
      .then(res => res.json())
      .then(res => {
        console.log(res);
        formExtrainfoRef.current?.querySelector("input[name=name]")?.setAttribute("value", "");
        formExtrainfoRef.current?.querySelector("input[name=value]")?.setAttribute("value", "");

        toast.success("Se ha ejecutado la acción correctamente");
        fetchAndSetExtraInfo()
        setEditingExtrainfo(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Error al crear la información extra");
      })
      .finally(() => setLoading(false));
    }else{
      toast.error("Debes completar todos los campos");
    }
  }

  function editExtraInfo(ei: ExtraInfo) {
    formExtrainfoRef.current?.querySelector("input[name=name]")?.setAttribute("value", ei.name);
    formExtrainfoRef.current?.querySelector("input[name=value]")?.setAttribute("value", ei.value);
    setEditingExtrainfo(true);
  }
  function deleteExtraInfo(ei: ExtraInfo) { 
    setLoading(true);
    myFetch(API + "/extra_info/delete/" + ei.name, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      toast.success("Información extra eliminada");
      fetchAndSetExtraInfo()
    })
    .catch(err => {
      console.error(err);
      toast.error("Error al eliminar la información extra");
    })
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    // if the new value is false, then reset the form
    if (!editingExtrainfo) {
      formExtrainfoRef.current?.reset();
      formExtrainfoRef.current?.querySelector("input[name=name]")?.setAttribute("value", "");
      formExtrainfoRef.current?.querySelector("input[name=value]")?.setAttribute("value", "");
    }
  }, [editingExtrainfo]);


  return<Container>
    {loading && <div className="loadingScreen"><div className="text">Loading...</div></div>}

    <div className="row">
      <h2>Export db: </h2>
      <button onClick={exportDb}><i className="fi fi-sr-file-export"></i></button>
    </div>
    <form className="row" onSubmit={importDb}>
      <h2>Import db: </h2>
      <input type="file" name="db" accept=".db" />
      <button type="submit"><i className="fi fi-sr-disk"></i></button>
    </form>

    <h2>Extra info</h2>
    <h3>Create</h3>
    <form className="row" onSubmit={createOrUpdateExtraInfo} ref={formExtrainfoRef}>
      <input type="text" placeholder="name" name="name" readOnly={editingExtrainfo}/>
      <input type="text" placeholder="value" name="value" />
      {
        editingExtrainfo ? 
        <>
          <button type="submit"><i className="fi fi-sr-check"></i></button>
          <button onClick={()=>setEditingExtrainfo(false)}><i className="fi fi-sr-cross"></i></button>
        </>
        :
        <button type="submit"><i className="fi fi-sr-plus"></i></button>
      }
    </form>
    {
      extraInfos && extraInfos.map((ei:ExtraInfo, index:number) => {
        return <div key={index} className="row">
          <h3>{ei.name}{"  :  "} {ei.value}</h3>
          <button onClick={()=>editExtraInfo(ei)}><i className="fi fi-sr-pencil"></i></button>
          <button onClick={()=>deleteExtraInfo(ei)}><i className="fi fi-sr-trash"></i></button>
        </div>
      })
    }
  </Container>
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f1f1f1;
  color: ${primaryColor};

  .loadingScreen{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 100;
    display: grid;
    place-items: center;
    .text{
      color:${secondaryColor};
      padding: 20px;
      border-radius: 10px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  button,a{
    background: ${primaryColor};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: all 0.2s;
    &:hover{
      background: ${secondaryColor};
      transform: scale(1.05);
      color: ${primaryColor};
      border: 1px solid ${primaryColor};
    }
  }

  .row{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 2em;
  }
`;
