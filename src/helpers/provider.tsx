// src/helpers/myFetch.tsx
import { API } from '../constants/appConstants.tsx';
import { ContactFormData } from '../interfaces/contactFormInterface.tsx';
import myFetch from './myFetch.tsx';

// Función para obtener diseños públicos
export async function fetchPublicDesigns(id:number | null = null) {
  try {
    
    const response = await myFetch(
      id 
        ?`${API}/design/public/${id}`
        : `${API}/designs/public`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching public designs:", error);
    throw error;
  }
}
export async function fetchAiFilteredDesigns(stringToSearch: string) {
  const res = await myFetch(API+"/designs/ai/"+stringToSearch)
  const data = await res.json();
  return data;
}

// Función para obtener etiquetas
export async function fetchTags() {
  try {
    const response = await myFetch(`${API}/tags`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}

export async function fetchExtraInfo() {
  try {
    const response = await myFetch(`${API}/extra_info`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching extra info:", error);
    throw error;
  }
}

export async function fetchSpecificExtrainfo(name:string) {
  try {
    const response = await myFetch(`${API}/extra_info/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bottle price:", error);
    throw error;
  }
}


export async function sendContactForm(data: ContactFormData) {
  try {
    const response = await fetch(`${API}/contact-us`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipent: "",
        from_email: data.email,
        from_name: data.name,
        subject: data.subject,
        message: data.message
      })
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending contact form:", error);
    throw error;
  }
}