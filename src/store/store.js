import { configureStore } from "@reduxjs/toolkit";
import { authSlice, themeSlice, languageSlice, connectionSlice, modalSlice, favoriteSlice, shoppingCartSlice, orderSlice, tableSlice } from "./";

export const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        language: languageSlice.reducer,
        auth: authSlice.reducer,
        connection: connectionSlice.reducer,
        modal: modalSlice.reducer,
        favorite: favoriteSlice.reducer,
        shoppingCart: shoppingCartSlice.reducer,
        order: orderSlice.reducer,
        tables: tableSlice.reducer,
    },

    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false
    })
})