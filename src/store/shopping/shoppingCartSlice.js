import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shoppingCart: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
    cleanShoppingCar: (state) => {
      state.shoppingCart = initialState.shoppingCart;
    }
  },
});

export const { setShoppingCart, cleanShoppingCar } = shoppingCartSlice.actions;