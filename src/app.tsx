import { useState } from "react";
import { DEBUG, LOCAL_API, REAL_API } from "./constants/appConstants";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/global/navbar/Navbar";
import { setUser } from "./redux/slices/userReducer";

export default function App() {

  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: any) => state.user);
  const dispacher = useDispatch();

  function singIn(e:React.FormEvent<HTMLButtonElement>){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget.form as HTMLFormElement));
    
    
    let url= (DEBUG? LOCAL_API : REAL_API) + "/users/read"

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        setError("Invalid username or password");
        throw new Error('Invalid username or password');
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setError(null);
      dispacher(
        setUser({
          userName: data.user.username,
          password: data.user.password,
          data: data.data
        })
      )

    })
    
  }


  return(
    <>
    <Navbar/>
    <h1> Sing in </h1>
    {error && <p>{error}</p>}
    <form style={{display:"flex",flexDirection:"column"}}>
      <input name="username" type="text" placeholder="Username"/>
      <input name="password" type="password" placeholder="Password"/>
      <button type="submit" onClick={singIn}>Sing in</button>
    </form>
    </>
  )
};
