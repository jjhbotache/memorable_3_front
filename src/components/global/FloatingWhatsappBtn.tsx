import { useEffect, useState } from "react";
import { fetchSpecificExtrainfo } from "../../helpers/provider";
import { Link } from "react-router-dom";
import styled from "styled-components";

const text = "Hola, me gustaría contactar con memorable!"
export default function FloatingWhatsappBtn() {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    async function main(){
      const {value:whatsappPhone} = await fetchSpecificExtrainfo("whatsapp_phone");
      
      setUrl(`https://api.whatsapp.com/send?phone=57${whatsappPhone}&text=${text}`);
      setOpen(true)
    }
    main();
  }, []);

  function sendToWhats(){
    window.open(url, "_blank");
  }

  return (!!url && open)?  (
    <Container>
      <i className=" whatsappIco fi fi-brands-whatsapp" onClick={sendToWhats} ></i>
      <i className="closeBtn fi fi-sr-circle-xmark" onClick={() => setOpen(false)}></i>
    </Container>
  ):null
};


const Container = styled.div`

  position: fixed;
  bottom: 1em;
  right: 1em;
  z-index: 1000;
  background-color: #25d366;
  text-decoration: none;
  color: white;

  padding: .5em;
  font-size: 1.5em;
  border-radius: 50%;
  aspect-ratio: 1;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 0 20px rgba(0,0,0,0.5) inset;
    transform: scale(.95);
  }

  .closeBtn{
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(25%, -25%);
    background-color: #333;
    color: white;
    border-radius: 50%;
    padding: .2em;
    font-size: 70%;
    cursor: pointer;
  }
`;