import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../enums';

export const apiSlice = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    fetchProd: builder.query({
      query: () => '/product',
      tag: ['Products'],
    }),
  }),
});
export const { useFetchProd } = apiSlice;
