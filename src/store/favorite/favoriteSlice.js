import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
};

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorite: (state, action) => {
            state.favorites = action.payload;
        },
        resetFavoriteState: (state) => {
            state.favorites = initialState.orderId;
        },
    },
});

export const { setFavorite, resetFavoriteState } = favoriteSlice.actions;