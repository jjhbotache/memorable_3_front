import { useSelector } from "react-redux";
import { Nav } from "./navbarStyledComponents";


export default function Navbar() {
  const user = useSelector((state:any) => state.user);

  return(
    <Nav>
      <h1>Navbar</h1>
      <img src={user.image_url} alt="profile picture" />
      <h2>User: <span className="small">{
        user.name ? user.name.split(" ")[0] : "No user logged in"
        }</span> </h2>
    </Nav>
  )
};
