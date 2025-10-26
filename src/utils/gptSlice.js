import { createSlice } from "@reduxjs/toolkit";

const getSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
  },
  reducers: {
    toggleGptSeachView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
  },
});

export const { toggleGptSeachView } = getSlice.actions;
export default getSlice.reducer;
