import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/auth/userAuth.js';
import productReducer from '../features/productSlice.js';
import { apiSlice } from '../services/apiSlice.js';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    auth: userReducer,
    product: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
setupListeners(store.dispatch);

export default store;
