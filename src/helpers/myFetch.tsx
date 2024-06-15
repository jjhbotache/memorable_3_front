interface Options {
  method?: string;
  body?: string | FormData;
  headers?: object;
}


export default function myFetch(url:string, options?:Options) {
  const google_sub = JSON.parse(localStorage.getItem("user") || "{}").google_sub;
  return fetch(url, {
    ...options,
    headers: {
      "google_sub": google_sub || null,
      ...options?.headers,
    }
  }
  )
};
