import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../enums';
//thunk
export const handleCart = createAsyncThunk(
  'cart/handleCart',
  async ({ type, id, data }, { rejectWithValue }) => {
    try {
      if (type === 'post') {
        const cartRes = await fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await cartRes.json();
        return result.data;
      }

      if (type === 'fetch') {
        const response = await fetch(`${API_URL}/carts${id}`);
        const result = await response.json();
        return result.data;
      }

      if (type === 'update') {
        const response = await fetch(`${API_URL}/cart/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        return result.data;
      }
      if (type === 'del') {
        await fetch(`${API_URL}/cart/${id}`, {
          method: 'DELETE',
        });

        return { _id: id };
      }
      throw new Error('invalid type');
    } catch (err) {
      return rejectWithValue(err?.message || 'Something went wrong');
    }
  }
);

const setLoading = (state) => {
  state.loading = true;
  state.error = null;
};
const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCart.pending, setLoading)
      .addCase(handleCart.rejected, setError)
      .addCase(handleCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const operationType = action.meta.arg.type;
        if (operationType === 'post') {
          state.items.push(action.payload);
        } else if (operationType === 'fetch') {
          state.items = action.payload;
        } else if (operationType === 'update') {
          const updatedItem = action.payload;

          const index = [...state.items].findIndex(
            (item) => item._id === updatedItem._id
          );
          if (index !== -1) {
            state.items[index] = {
              ...state.items[index],
              ...updatedItem,
            };
          }
        } else if (operationType === 'del') {
          state.items = [...state.items].filter(
            (item) => item._id !== action.payload._id
          );
        }
      });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
