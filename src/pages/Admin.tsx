import styled from "styled-components"
import Navbar from "../components/global/navbar/Navbar"
import { useEffect, useState } from "react";
import myFetch from "../helpers/myFetch";
import { API } from "../constants/appConstants";
import { useNavigate } from "react-router-dom";
import { primaryColor, secondaryColor } from "../constants/styleConstants";
import DesignManager from "../components/admin/DesignManager";

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
    "wines",
    "users",
    "orders"
  ];

  return(
    <>
      <AdminPage>
        <Navbar />
        <div className="main">
          <select className="select" value={tableEditing} onChange={e=>setTableEditing(e.target.value)} >
            <option value="">Selecciona una tabla</option>
            {tablesToEdit.map(table => <option key={table} value={table}>{table}</option>)}
          </select>
          <div className="divider"/>
          <h1>{tableEditing}</h1>
          { tableEditing === "designs" && <DesignManager /> }
        </div>
      </AdminPage>
    </>
  )
};

const AdminPage = styled.main`
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background-color: #f0f0f0;
  h1{
    font-size: 4em;
    color: ${primaryColor};
  }
  .main{
    display: flex;
    flex-direction: column;
    align-items: center;
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