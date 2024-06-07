import { useSelector } from "react-redux";
import { Nav } from "./navbarStyledComponents";


export default function Navbar() {
  const user = useSelector((state:any) => state.user);

  return(
    <Nav>
      <h1>Navbar</h1>
      <h2>User: <span>{
        user.userName ? user.userName : "No user logged in"
        }</span> </h2>
    </Nav>
  )
};
