import { FormEvent, useEffect, useState } from "react";
import { AddDropdown, EditorContainer, ElementsContainer, StyledForm } from "./managerStyledComponents";
import myFetch from "../../helpers/myFetch";
import { API } from "../../constants/appConstants";

interface User{
  google_sub: string;
  name: string;
  email: string;
  phone?: string;
  img_url: string;
}

export default function UsersManager() {
  // const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [deletingUser, setDeletingUser] = useState<null|string>(null);
  const [editingUser, setEditingUser] = useState<null|User>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    myFetch(API + "/users")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // filter the current user
        res = res.filter((t:User) => t.google_sub !== JSON.parse(localStorage.getItem("user") || "{}").google_sub);
        setUsers(res);
      });
  }


  function deleteUser(google_sub:string) {
    if (!confirm("¿Estas seguro que deseas eliminar este User?")) return  
    setDeletingUser(google_sub);
    myFetch(API + "/user/delete/"+google_sub, {method: "DELETE"})
      .then(res => res.json())
      .then(res => {
        console.log(res);
        fetchUsers();
      })
      .catch(err => {
        console.log(err);
        alert("No se pudo eliminar el User");
      })
      .finally(() => setDeletingUser(null));
  }

    
  function onEdit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget) as Iterable<[string, string]>);
    // verify all the fields are filled
    if (!data.name || !data.email ||  !data.img_url) {
      alert("Por favor llena todos los campos obligatorios");
      return;
    }

    // format the name to have the first letter capitalized of each word
    const formattedName = data.name.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
    


    myFetch(API + "/user/update", {
      method: "PUT",
      body: JSON.stringify({
        google_sub: editingUser?.google_sub,
        name: formattedName,
        email: editingUser?.email,
        phone: editingUser?.phone,
        img_url: editingUser?.img_url
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        fetchUsers();
        setEditingUser(null);
      })
      .catch(err => console.log(err));
  }

  console.log(users.length===0);
  
  return(
    <>
    <ElementsContainer>
      {users.length===0 ?
       <p>No hay Users</p>
       :
       users.map(u => (
        <div key={u.google_sub} className="row">
          <p>{u.name}</p>
          <p>{u.email}</p>
          <p>{u.phone || "Sin numero celular"}</p>
          <img className="icon" src={u.img_url} alt={u.name}/>
          <div className="btns">
            <button disabled={deletingUser===u.google_sub} onClick={()=>deleteUser(u.google_sub)}>Eliminar</button>
            <button onClick={()=>{setEditingUser(u)}}>Editar</button>
          </div>
        </div>
      ))
      }
      
    </ElementsContainer>
    <EditorContainer 
      className="editor" 
      open={editingUser != null}
      onClick={e=>{if((e.target as HTMLDivElement).classList.contains("editor")) setEditingUser(null)}}>
      <div className="main">
        <i className="fi-rr-cross-small close" onClick={()=>setEditingUser(null)}></i>
        <h1>Editar User</h1>
        <form onSubmit={onEdit}>
          <input className="required" type="text" name="name" placeholder="Name" defaultValue={editingUser?.name}/>
          <input className="required" type="email" name="email" placeholder="Email" defaultValue={editingUser?.email}/>
          <input type="tel" name="phone" placeholder="Phone" defaultValue={editingUser?.phone}/>
          <img className="small" src={editingUser?.img_url}/>
          <input className="required" type="text" name="img_url" placeholder="Image URL" defaultValue={editingUser?.img_url} onChange={
            e=>{
              setEditingUser({
                ...editingUser!,
                img_url: e.currentTarget.value
              });
            }
          }/>
          <button type="submit">Editar</button>
        </form>
      </div>
    </EditorContainer>
    </>
  )
};