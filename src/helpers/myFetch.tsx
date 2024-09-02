import store from "../redux/store";

interface Options {
  method?: string;
  body?: string | FormData;
  headers?: object;
}


export default function myFetch(url:string, options?:Options) {
  const user = store.getState().user;

  const google_sub = user.google_sub;
  return fetch(url, {
    ...options,
    headers: {
      "google_sub": google_sub || null,
      ...options?.headers,
    }
  }
  )
};
