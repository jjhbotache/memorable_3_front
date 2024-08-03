import styled from "styled-components"
import { useEffect, useState } from "react";
import myFetch from "../helpers/myFetch";
import { API } from "../constants/appConstants";
import { useNavigate } from "react-router-dom";
import { primaryColor, secondaryColor } from "../constants/styleConstants";
import DesignManager from "../components/admin/DesignManager";
import TagsManager from "../components/admin/TagsManager";
import UsersManager from "../components/admin/UsersManager";
import MoreConfigs from "../components/admin/MoreConfigs";

export default function Admin() {
  const navigate = useNavigate();
  const [tableEditing , setTableEditing] = useState<string>("");

  

  useEffect(() => {
    // if not admin, redirect to home
    myFetch(API+"/verify-admin")
      .then(res => {
        if(res.status === 200) {
          return res.json();
        } else {
          throw new Error("not an admin");
        }
      })
      .then(() => console.log("admin"))
      .catch(() => {
        console.log("not an admin");
        navigate("/");
      })
  }, []);

  const tablesToEdit = [
    "designs",
    "tags",
    "users",
    "More configs"
  ];

  return(
    <>
      <AdminPage>
        <div className="main">
          <select className="select" value={tableEditing} onChange={e=>setTableEditing(e.target.value)} >
            <option value="">Selecciona una tabla</option>
            {tablesToEdit.map(table => <option key={table} value={table}>{table}</option>)}
          </select>
          <div className="divider"/>
          <h1>{tableEditing}</h1>
          { tableEditing === "designs" && <DesignManager /> }
          { tableEditing === "tags" && <TagsManager /> }
          { tableEditing === "users" && <UsersManager /> }
          { tableEditing === "More configs" && <MoreConfigs /> }

        </div>
      </AdminPage>
    </>
  )
};

const AdminPage = styled.main`
  width:
   100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  h1{
    font-size: 2em;
    color: ${primaryColor};
    margin-bottom: 2rem;
  }
  .main{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${secondaryColor};
  }
  .select{
    font-size: large;
    margin: 10px;
    padding: .5em .8em;
    border-radius: 999px;
    border: 1px solid ${primaryColor};
    background: ${secondaryColor};
    font-family: "FragmentCore";
    font-weight: 500;
    option{
      font-family: "FragmentCore";
      font-weight: 700;
    }
  }
  .divider{
    width: 95%;
    height: 1px;
    margin: 2em 0;
    background: ${primaryColor};
  }
`