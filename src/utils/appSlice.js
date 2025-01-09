import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
    category: "All",
    isDarkMode: false, // Add dark mode state
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    }, // Add dark mode toggle reducer
  },
});

export const { toggleMenu, closeMenu, setCategory, toggleDarkMode } =
  appSlice.actions;
export default appSlice.reducer;
