import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { API_URL } from '../enums';
import { getAuthData } from '../enums';
const apiUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers) => {
    const token = getAuthData('token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Products', 'Cart', 'Orders', 'User', 'Address', 'Order', 'PSGC'],
  endpoints: () => ({}), // inject endpoints elsewhere
});
