import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAccessToken, getAccessToken } from '../utils/tokenManager';
import { logOutUser } from '../features/auth/userAuth';
const apiUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    console.log('token', token);

    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    let refreshResult = await baseQuery(
      { url: '/refresh', method: 'POST' },
      api,
      extraOptions,
    );
    console.log('refresh token', refreshResult);
    if (refreshResult.data) {
      setAccessToken(refreshResult.data.accessToken);
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if refreshToken expired force to logout
      api.dispatch(logOutUser());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefresh,
  tagTypes: [
    'Products',
    'Cart',
    'Orders',
    'User',
    'Address',
    'Order',
    'PSGC',
    'Activity',
  ],
  endpoints: () => ({}),
});
