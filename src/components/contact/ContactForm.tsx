import { useState } from "react";
import { API } from "../../constants/appConstants";
import { ContactFormStyled } from "./contactFormStyled";
import { toast } from "react-toastify";

const text = "https://api.whatsapp.com/send?phone=573232512182&text=Hola, me gustaría contactar con memorable!"
export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  function sendMail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    console.log(data);
    
    if (data.name === "" || data.email === "" || data.subject === "" || data.message === "") {
      if (data.name === ""){ toast.error("El campo nombre es obligatorio"); return}
      if (data.email === ""){ toast.error("El campo email es obligatorio"); return}
      if (data.subject === ""){ toast.error("El campo asunto es obligatorio"); return}
      if (data.message === ""){ toast.error("El campo mensaje es obligatorio"); return}
    }


    setLoading(true);
    fetch(API+"/contact-us",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipent: "",
        from_email: data.email,
        from_name: data.name,
        subject: data.subject,
        message: data.message
      })
    }).then(res => res.json()).then(res => {
      if (res.status === "ok") {
        toast.success("Mensaje enviado correctamente")
        setForm({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        toast.error("Error al enviar el mensaje")
        console.log(res);
        
      }
    }).catch(err => {
      console.log(err)
    
    })
    .finally(() => {
      setLoading(false);
    });
  }

  function sendToWhatsapp() {
    window.open(text, "_blank");
  }

  return(
    <ContactFormStyled>
      <form className="form" onSubmit={sendMail}>
        <h1>Contact Us</h1>
          <input type="text" placeholder="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
          <input type="email" placeholder="Email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
          <input type="text" placeholder="Subject" name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}/>
          <textarea rows={3}  placeholder="Message" name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
          <button>{
            loading ? "Enviando..." : "Enviar"
            }</button>
      </form>
      <div className="separatorText">
        <div className="divider"/>
        <p>Contáctanos a traves de whatsapp:</p>
      </div>
      <i onClick={sendToWhatsapp} className=" whatsappIco fi fi-brands-whatsapp"></i>
    </ContactFormStyled>    
  )
};
