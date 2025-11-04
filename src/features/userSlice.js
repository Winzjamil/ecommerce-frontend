import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userAuth = createAsyncThunk(
  'user/userAuth',
  async ({ credentials, type }, { rejectWithValue }) => {
    const url = `http://localhost:8080/${type}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const result = await res.json();
    if (!res.ok) {
      return rejectWithValue(result.message || `${type} failed`);
    }
    if (type === 'login') {
      localStorage.setItem('user', JSON.stringify(result.user));
    }
    return { user: result.user, type };
  }
);

const savedUser = localStorage.getItem('user');
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuth.fulfilled, (state, action) => {
        state.loading = false;
        const { type, user } = action.payload;
        if (type === 'login') {
          state.user = user;
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
