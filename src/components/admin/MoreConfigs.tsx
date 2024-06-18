import styled from "styled-components"
import { primaryColor, secondaryColor } from "../../constants/styleConstants";
import myFetch from "../../helpers/myFetch";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { API } from "../../constants/appConstants";

export default function MoreConfigs() {
  const [loading, setLoading] = useState<Boolean>(false);

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
