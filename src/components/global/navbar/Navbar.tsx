import { useDispatch, useSelector } from "react-redux";
import { Nav, Sidebar } from "./navbarStyledComponents";
import logoImg from "../../../assets/branding/logo.png"
import GoogleLogin, { GoogleLoginResponse} from "react-google-login";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API,  googleClientId } from "../../../constants/appConstants";
import { setUser } from "../../../redux/slices/userReducer";


export default function Navbar() {
  const user = useSelector((state:any) => state.user);
  const [openMenu, setOpenMenu] = useState("close");
  const dispacher = useDispatch();

  useEffect(() => {
    // get from local storage the user info if exists
    const userLS = localStorage.getItem("user");
    if(userLS){
      dispacher(setUser(JSON.parse(userLS)));
    }
  }, [])

  useEffect(() => {
    // each time the user changes, save it in local storage
    localStorage.setItem("user", JSON.stringify(user));
  }, [user])
  

  const links = [
    {name: "Nosotros", url: "/us"},
    {name: "vinos", url: "/wines"},
    {name: "Diseños", url: "/designs"},
    {name: "Contacto", url: "/contact"},
  ]

  const sidebarVariants = {
    open: { display: "block", opacity: 1},
    close: { x:"100%", opacity: 0}
  }
  const bgVariants = {
    open: { display: "block", opacity: 0.5},
    close: { display: "none", opacity: 0}
  }

  function onLoginSignupSucced(response:GoogleLoginResponse) {
    const url = API + "/user-login-signup";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        google_sub: response.profileObj.googleId,
        name: response.profileObj.name,
        email: response.profileObj.email,
        phone: null,
        image_url: response.profileObj.imageUrl,
      }),
    })

    dispacher(setUser({
      google_sub: response.profileObj.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
      phone: null,
      image_url: response.profileObj.imageUrl,
    }));
    localStorage.setItem("user", JSON.stringify({
      google_sub: response.profileObj.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
      phone: null,
      image_url: response.profileObj.imageUrl,
    }));
  }
  
  function closeSession() {
    dispacher(setUser({
      google_sub: null,
      name: null,
      email: null,
      phone: null,
      image_url: null
    }));
    localStorage.removeItem("user");
  }

  
  return(
    <>
    <Nav>
      <img className="logo" src={logoImg} alt="logo" />
      <ul className="menu">
        {links.map((link, index) => <li key={index}><a
          href={link.url}>{link.name}</a></li>)}
      </ul>
      <div className="icons">
        <i className=" ico fi fi-ss-heart"></i>
        <i className=" ico fi fi-rr-shopping-cart"></i>
        {
          user.google_sub == null ? <i onClick={()=>setOpenMenu("open")} className=" ico fi fi-rr-user"></i>:
          <img onClick={()=>setOpenMenu("open")} src={user.image_url} alt="user" />          
        }
      </div>

      <div className="compactMenu" onClick={()=>setOpenMenu("open")}>
        <i className="fi fi-rr-menu-burger"></i>
      </div>
    </Nav>
    <Sidebar >
      <motion.div  variants={bgVariants} animate={openMenu}  className="background" onClick={()=>setOpenMenu("close")} />

      <motion.aside variants={sidebarVariants} animate={openMenu} transition={{ type: "spring", bounce:0.2 }} >
        {
          user.google_sub == null ? 
          <>
          <div>
            <h1>Inicia sesion</h1>
            <div className="small">o registrate con:</div>
          </div>
          <GoogleLogin
            clientId={googleClientId}
            buttonText="Google Login"
            onSuccess={(response) => onLoginSignupSucced(response as GoogleLoginResponse)}
            onFailure={(response) => console.log(response)}
            cookiePolicy={'single_host_origin'}
          />
          </>
          :
          <>
          <div>
            <div className="welcome">
              <div>
                <div className="small">Hola</div>
                <h1 className="name">{user.name}</h1>
              </div>
              <img src={user.image_url}/>
            </div>
            <button className="btn" >Tu informacion</button>
            <button className="btn closeSession"  onClick={closeSession}>Cerrar sesion</button>
          </div>
          </>
        }
        
        <div className="onCompactedOptions">
          <hr className="divider"/>
          <ul className="menu">
            {links.map((link, index) => <li key={index}><a
            href={link.url}>{link.name}</a></li>)}
          </ul>
          <i className="fi fi-ss-heart"></i>
          <i className="fi fi-rr-shopping-cart"></i>
        </div>
      </motion.aside>      
    </Sidebar>
    </>
  )
};
