import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice.js';
import { apiSlice } from '../features/api/apiSlice.js';
import userReducer from '../features/userSlice.js';
import { setupListeners } from '@reduxjs/toolkit/query';
import productReducer from '../features/productSlice.js';

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     user: userReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });
// setupListeners(store.dispatch);
// export default store;
// cart: cartReducer,
//     user: userReducer,

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    product: productReducer,
  },
});

export default store;
