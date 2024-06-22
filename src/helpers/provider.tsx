// src/helpers/myFetch.tsx
import { API } from '../constants/appConstants.tsx';
import myFetch from './myFetch.tsx';

// Función para obtener diseños públicos
export async function fetchPublicDesigns(id:number | null = null) {
  try {
    
    const response = await myFetch(
      id ? `${API}/design/public/${id}` : `${API}/designs/public`
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
