import { createSlice } from "@reduxjs/toolkit";

function getSystemTheme() {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  return darkThemeMq.matches ? "dark" : "light";
}

const themeSlice = createSlice({
  name: "theme",
  initialState:getSystemTheme(),
  reducers: {
    setTheme: (state) => {
      return state === "dark" ? "light" : "dark";
    },
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;