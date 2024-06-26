export const DEBUG = import.meta.env.MODE === "development";
const REAL_API = "https://memorable-3-back.onrender.com";
const LOCAL_API = "http://127.0.0.1:8000";
export const API = DEBUG ? LOCAL_API : REAL_API;


export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;