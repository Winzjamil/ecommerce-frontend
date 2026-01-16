import { apiSlice } from '../../services/apiSlice';
export const shopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/product_list',
      transformResponse: (response) => response.data || [],
      providesTags: ['Products'],
    }),
    getUserProducts: builder.query({
      query: () => '/product',
      transformResponse: (response) => response.data || [],
      providesTags: ['Products'],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/product',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProductItem: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/product/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['Products'],
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    //////////////>>>>>>>> CART <<<<<<<<///////////////
    getCart: builder.query({
      query: () => '/cart',
      transformResponse: (response) => response.data || [],
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (item) => ({
        url: '/cart',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartItem: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/cart/${id}`,
        method: 'PATCH',
        body: updatedData,
        transformResponse: (response) => response.data || [],
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    ////////////<<<<<<<<ADDRESS>>>>>>>>///////////
    fetchAddress: builder.query({
      query: () => '/address',
      transformResponse: (response) => response.data || [],
      providesTags: ['Address'],
    }),
    addAddress: builder.mutation({
      query: (item) => ({
        url: '/address',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Address'],
    }),
    updateAddress: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/address/${id}`,
        method: 'PATCH',
        body: updatedData,
        transformResponse: (response) => response.data || [],
      }),
      invalidatesTags: ['Address'],
    }),
    SetDefaultAdd: builder.mutation({
      query: (id) => ({
        url: `/address/${id}/default`,
        method: 'PATCH',
        transformResponse: (response) => response.data || [],
      }),
      invalidatesTags: ['Address'],
    }),
    removeAddress: builder.mutation({
      query: (id) => ({
        url: `/address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),

    ///////////////////<<<<<<USERS>>>>>>>>/////////////////
    getUsers: builder.query({
      query: () => '/users_list',
      transformResponse: (response) => response.data || [],
      providesTags: ['User'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    ///////////////////////<<<<<<<<<<<ORDER>>>>>>>>>/////////////////
    addOrder: builder.mutation({
      query: (item) => ({
        url: '/place_order',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrder: builder.query({
      query: () => '/order',
      transformResponse: (response) => response.data || [],
      providesTags: ['Order'],
    }),

    /////////////////////////////////////////////////////////////////////
    getPsgc: builder.query({
      query: (params) => ({
        url: '/get_psgc',
        params,
      }),
      transformResponse: (response) => response.data || [],
      providesTags: ['PSGC'],
    }),

    ////////////////////ADMIN ACCESS/////////////////
    adminRemoveProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    getActivity: builder.query({
      query: () => '/userActivity',
      transformResponse: (response) => response.data || [],
      providesTags: ['Activity'],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetUserProductsQuery,
  useAddProductMutation,
  useUpdateProductItemMutation,
  useRemoveProductMutation,
  //////////<<<<CARTS>>>>>>//////////
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  //////////<<<<ADDRESS>>>>>//////////
  useFetchAddressQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useSetDefaultAddMutation,
  useRemoveAddressMutation,
  ///////////<<<<<<USERS>>>>/////////
  useGetUsersQuery,
  useLogoutUserMutation,
  //////////<<<<<<ORDER>>>>/////////
  useGetOrderQuery,
  useAddOrderMutation,

  ///////////////////////////////////
  useGetPsgcQuery,
  useAdminRemoveProductMutation,
  useGetActivityQuery,
} = shopApi;
