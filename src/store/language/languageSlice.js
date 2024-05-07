import { createSlice } from '@reduxjs/toolkit';

const storedLanguage = localStorage.getItem("language") || "es";
export const updateLocalStorageLanguage= (language) => {
  localStorage.setItem('language', language);
};

export const languageSlice = createSlice({
    name: 'language',
    initialState: {
      language: storedLanguage,
    },
    reducers: {
      setLanguage: (state, action) => {
        state.language = action.payload;
      },
    },
});

export const { setLanguage } = languageSlice.actions;
