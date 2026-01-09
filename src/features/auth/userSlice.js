import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '../../enums';
const API_URL = import.meta.env.VITE_API_URL;

export const userAuth = createAsyncThunk(
  'user/userAuth',
  async ({ credentials, type }, { rejectWithValue }) => {
    const url = `${API_URL}/${type}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const result = await res.json();

    if (!res.ok) {
      return rejectWithValue(result.message || 'Request failed');
    }

    if (type === 'login') {
      result.user ? setUser('user', result.user) : null;
      result.token ? setUser('token', result.token) : null;
    }

    if (res.ok) {
      return { type, user: result.user };
    }
  }
);
const initialState = {
  user: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: 'auth',
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
        const { type, user } = action.payload;

        if (type && type === 'login') {
          state.user = user;
        }
      })
      .addCase(userAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOutUser } = userSlice.actions;
export default userSlice.reducer;
