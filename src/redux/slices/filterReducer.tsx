import { createSlice } from "@reduxjs/toolkit";


const filerReducerSlice = createSlice({
  name: "filter",
  initialState: {
    name: "",
    tags: [],
  },
  reducers: {
    setFilter: (state, action) => {
      state.name = action.payload.name;
      state.tags = action.payload.tags;
    },
  },
});

const filterReducer = filerReducerSlice.reducer;
export default filterReducer;
export const { setFilter } = filerReducerSlice.actions;