import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice.js';
import productReducer from '../features/productSlice.js';
import userReducer from '../features/userSlice.js';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
  },
});

export default store;
