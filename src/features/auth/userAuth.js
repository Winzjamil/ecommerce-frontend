import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setAccessToken, getAccessToken } from '../../utils/tokenManager';
const API_URL = import.meta.env.VITE_API_URL;

export const getProfileApi = async () => {
  const token = getAccessToken();
  const url = API_URL;
  if (!token) {
    throw new Error('No access token');
  }
  const res = await fetch(`${url}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  const result = await res.json();

  if (!res.ok) throw new Error('Not authenticated');
  return result;
};
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (__, { rejectWithValue }) => {
    try {
      return await getProfileApi();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
// login credentilas
export const userAuth = createAsyncThunk(
  'user/userAuth',
  async (credentials, { rejectWithValue }) => {
    const url = `${API_URL}/login`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const result = await res.json();

    if (!res.ok)
      return rejectWithValue(result.message || 'something went wrong');
    setAccessToken(result?.token);
  },
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOutUser } = userSlice.actions;
export default userSlice.reducer;
