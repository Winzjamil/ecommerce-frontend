import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, setUser, getAuthData } from '../enums';

export const userAuth = createAsyncThunk(
  'user/userAuth',
  async ({ credentials, type }, { rejectWithValue }) => {
    const url = `${API_URL}/${type}`;
    console.log('TYPE', type, 'URL', url);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const result = await res.json();

    if (!res.ok) {
      return rejectWithValue(res.message);
    }

    if (type === 'login') {
      result.user ? setUser('user', result.user) : null;
      result.token ? setUser('token', result.token) : null;
    }

    if (res.ok) {
      return { type: type, user: result.user };
    }

    if (type === 'address') {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (res.ok) {
        const result = await res.json();
        return { type, data: result.data };
      } else {
        return rejectWithValue(res.message);
      }
    }
  }
);
const initialState = {
  user: getAuthData('user'),
  address: '',
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuth.fulfilled, (state, action) => {
        state.loading = false;
        const { type, user, data } = action.payload;
        console.log('data', data);
        if (type && type === 'login') {
          state.user = user;
        }
        if (type && type === 'address') {
          state.address = data;
        }
      })
      .addCase(userAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logOutUser } = userSlice.actions;
export default userSlice.reducer;
