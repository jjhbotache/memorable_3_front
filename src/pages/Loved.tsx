import styled from "styled-components";
import Navbar from "../components/global/navbar/Navbar";
import { useEffect, useState } from "react";
import Desing from "../interfaces/designInterface";
import { API } from "../constants/appConstants";
import { useNavigate } from "react-router-dom";
import DesignsContainer from "../components/design/designContainer/DesignContainer";

export default function Loved() {
  const [lovedDesigns, setlovedDesigns] = useState<Desing[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if(!user.google_sub) navigate("/login");
    // get the loved designs
    fetchLovedDesigns(user);

  }, []);


  return(
    <Container>
      <Navbar/>
      <DesignsContainer designs={lovedDesigns} arragment={"column"} />
      {/* <DesignsStyledContainer  $styleBehavior={"column"}>
      {
        (lovedDesigns.length != 0) ? lovedDesigns.map((design:Desing) => {
          return(
            <DesignComponent design={design} displayStyle={"column"} key={design.id} />
          )
        })
        :
        <h1>No se encontraron diseños</h1>

      }
      </DesignsStyledContainer> */}
    </Container>
  )

  function fetchLovedDesigns(user: any) {
    fetch(API + "/favorite/" + user.google_sub)
      .then(res => res.json())
      .then(res => {
        setlovedDesigns(res.map((d: Desing) => ({ ...d, loved: true })));
      })
      .catch(err => {
        console.log(err)
        fetchLovedDesigns(user);
      })
  }
};


const Container = styled.div`
    
  `;
