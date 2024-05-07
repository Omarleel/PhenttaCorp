import { createSlice } from '@reduxjs/toolkit';

const storedTheme = localStorage.getItem("theme") || "light";
export const updateLocalStorageTheme = (theme) => {
    localStorage.setItem('theme', theme);
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
      theme: storedTheme,
    },
    reducers: {
      setTheme: (state, action) => {
        state.theme = action.payload;
      },
    },
});

export const { setTheme } = themeSlice.actions;
