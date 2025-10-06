import { createSlice } from '@reduxjs/toolkit';
const cartSlice = {
  name: 'cart',
  inetialState: { cartItems: [] },
  reducer: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
};
