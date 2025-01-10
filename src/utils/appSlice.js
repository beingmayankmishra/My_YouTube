import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
    category: "All",
    isDarkMode: false, 
    voiceText: "", 
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
    }, 
    setVoiceText: (state, action) => {
      state.voiceText = action.payload; 
    },
  },
});

export const { toggleMenu, closeMenu, setCategory, toggleDarkMode, setVoiceText } =
  appSlice.actions;
export default appSlice.reducer;
