import { useDispatch, useSelector } from "react-redux";
import { Nav, Sidebar } from "./navbarStyledComponents";
import logoImg from "../../../assets/branding/logo.png"
import GoogleLogin, { GoogleLoginResponse} from "react-google-login";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API,  googleClientId } from "../../../constants/appConstants";
import { setUser } from "../../../redux/slices/userReducer";
import { Link, useNavigate } from "react-router-dom";
import myFetch from "../../../helpers/myFetch";
import { toast } from "react-toastify";
import User from "../../../interfaces/userInterface";


export default function Navbar() {
  const user:User = useSelector((state:any) => state.user);
  const [openMenu, setOpenMenu] = useState("close");
  const dispacher = useDispatch();
  const [admin, setAdmin] = useState(false);
  const [readyToDeleteAccount, setReadyToDeleteAccount] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    // get from local storage the user info if exists
    // debugger
    const userLS = localStorage.getItem("user");
    if(userLS){
      dispacher(setUser(JSON.parse(userLS)));
    }
    verifyAdmin();
  }, [])

  

  const links = [
    {name: "Nosotros", url: "/us"},
    {name: "vinos", url: "/wines"},
    {name: "Diseños", url: "/designs"},
    {name: "Contacto", url: "/contact"},
    admin ? {name: "Admin", url: "/admin"} : {name: "", url: "/admin"}
  ]

  const sidebarVariants = {
    open: { display: "block", opacity: 1, x:0},
    close: { x:"100%", opacity: 0,display: "none"}
  }
  const bgVariants = {
    open: { display: "block", opacity: 0.5},
    close: { display: "none", opacity: 0}
  }

  function verifyAdmin() {
    myFetch(API+"/verify-admin")
      .then(res => {
        if(res.status === 200) {
          return res.json();
        } else {
          throw new Error("not an admin");
        }
      })
      .then(() => setAdmin(true))
      .catch(() => {
        // console.log("not an admin");
        setAdmin(false);
      })
  }

  function onLoginSignupSucced(response:GoogleLoginResponse) {

    // if admin, set a cookie with the admin
    
    

    const url = API + "/user-login-signup";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        google_sub: response.profileObj.googleId,
        name: response.profileObj.name,
        email: response.profileObj.email,
        phone: null,
        img_url: response.profileObj.imageUrl,
      }),
    })
    .then(res => res.json())
    .then(res=>{
      const user:User = res.user;
      if(res.details) throw new Error(res.details);
      dispacher(setUser({
        google_sub: user.google_sub,
        name: user.name,
        email: user.email,
        phone: user.phone,
        img_url: user.img_url,
      }));
      verifyAdmin();
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error al iniciar o crear cuenta, intenta de nuevo");
    });

  }
  
  function closeSession() {
    dispacher(setUser({
      google_sub: null,
      name: null,
      email: null,
      phone: null,
      img_url: null
    }));
    localStorage.removeItem("user");
    navigate("/");
  }
  function deleteAccount() {
    toast.warning("Eliminando cuenta, por favor espera...", {autoClose: 5000});
    myFetch(API + "/user/delete/" + user.google_sub, {method: "DELETE"})
      .then(res => {
        if(res.status === 200) {
          dispacher(setUser({
            google_sub: null,
            name: null,
            email: null,
            phone: null,
            img_url: null
          }));
          localStorage.removeItem("user");
          navigate("/");
          // clean all toats
          toast.dismiss();
        }
      })
  }
  useEffect(() => {
    if(readyToDeleteAccount) {
      toast.error(
        `Seguro que quieres eliminar tu cuenta?Se perderan todos tus diseños favoritos y carrito de compras, esta accion no se puede deshacer, si estas seguro, presiona el boton de nuevo.`,
        {autoClose: 10000}
      );
      setTimeout(() => {
        setReadyToDeleteAccount(false);
      }, 3000);
    }
    
  }, [readyToDeleteAccount])


  function goToLoved() {
    user.google_sub == null
      ? toast.error("Necesitas iniciar sesion para ver tus diseños favoritos")
      : navigate("/loved");
  }

  function goToCart() {
    user.google_sub == null
      ? toast.error("Necesitas iniciar sesion para ver tu carrito de compras")
      : navigate("/cart");
  }

  function deleteNumber() {
    fetch(API + "/user/delete-phone/" + user.google_sub, {method: "DELETE"})
      .then(res=>res.json())
      .then(res => {
        if(res.details) throw new Error(res.details);
        dispacher(setUser({...user, phone: null}));
        toast.success("Numero eliminado correctamente");
      })
      .catch(() => toast.error("Error al eliminar el numero, intenta de nuevo."));
  }

  
  // reusable components
  const Icons = () =><>
    <i onClick={goToLoved} className=" ico fi fi-ss-heart"></i>
    <i onClick={goToCart} className=" ico fi fi-rr-shopping-cart"></i>
  </>

  return(
    <>
    <Nav>
      <Link to="/"> <img className="logo" src={logoImg} alt="logo" /> </Link>
      <ul className="menu">
        {links.map((link, index) => 
        <li key={index}>
          <Link to={link.url}>{link.name}</Link>
        </li>
        )}
      </ul>
      <div className="icons">
        <Icons/>
        {
          user.google_sub == null ? <i onClick={()=>setOpenMenu("open")} className=" ico fi fi-rr-user"></i>:
          <img onClick={()=>setOpenMenu("open")} src={user.img_url} alt="user" />          
        }
      </div>

      <div className="compactMenu" onClick={()=>setOpenMenu("open")}>
        <i className="fi fi-rr-menu-burger"></i>
      </div>
    </Nav>
    <Sidebar>
      <motion.div  variants={bgVariants} animate={openMenu}  className="background" onClick={()=>setOpenMenu("close")} />

      <motion.aside initial={false} variants={sidebarVariants} animate={openMenu} transition={{ type: "spring", bounce:0.2 }} >
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
              <img src={user.img_url} alt="profileImg"/>
            </div>
            <details className="btn" >
              <summary>Tu informacion</summary>
              <ul>
                <li> <strong> Nombre:</strong>{" "+user.name}</li>
                <li> <strong> Email:</strong>{" "+user.email}</li>
                <li> <strong> Celular:</strong>{" "+ (user.phone || "No registrado")} <i className="fi fi-ss-trash-xmark" onClick={deleteNumber}></i> </li>
              </ul>
              <button className={"deleteAccountBtn " + (readyToDeleteAccount && "reallyShaking") } onClick={ !readyToDeleteAccount ?()=>setReadyToDeleteAccount(true) : deleteAccount
              }> { readyToDeleteAccount ? "seguro?":"Eliminar cuenta"}</button>
            </details>
            <button className="btn closeSession"  onClick={closeSession}>Cerrar sesion</button>
          </div>
          </>
        }
        
        <div className="onCompactedOptions">
          <hr className="divider"/>
          <ul className="menu">
            {links.map((link, index) => (
              link.name && <Link to={link.url} key={index} onClick={()=>setOpenMenu("close")}>
                <li>{link.name}</li>
              </Link>
            ))}
          </ul>
          <Icons/>  
        </div>
      </motion.aside>      
    </Sidebar>
    </>
  )
};
