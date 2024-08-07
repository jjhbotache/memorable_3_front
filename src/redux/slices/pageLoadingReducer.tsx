import { createSlice } from "@reduxjs/toolkit";

const pageLoading = createSlice({
  name: "pageLoading",
  initialState: false,
  reducers: {
    setPageLoading: (_, action) => {
      return action.payload;
    },
  },
});

export const { setPageLoading } = pageLoading.actions;
export default pageLoading.reducer;