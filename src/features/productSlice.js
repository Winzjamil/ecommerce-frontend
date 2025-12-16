import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../enums';

export const productHandle = createAsyncThunk(
  'product/productHandle',
  async ({ id, type, data }, { rejectWithValue }) => {
    try {
      if (type === 'get') {
        const res = await fetch(`${API_URL}/product`);
        if (!res.ok) {
          return rejectWithValue(res.message);
        }
        const result = await res.json();

        return result.data;
      }
      if (type === 'patch') {
        console.log('its me patch');
        const res = await fetch(`${API_URL}/product${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const result = await res.json();
          return result.data;
        }
        return { _id: id };
      }
      if (type === 'add') {
        const productResponse = await fetch(`${API_URL}/product`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!productResponse.ok) {
          return rejectWithValue(productResponse.message);
        }
        const result = await productResponse.json();
        return result.data || [];
      }

      if (type === 'delete') {
        await fetch(`${API_URL}/product/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          return rejectWithValue(res.message || 'failed to delete item');
        }
        return { _id: id };
      }
    } catch (err) {
      console.Error(err.message);
    }
  }
);
const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchValue: '',
    preview: null,
  },

  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
    resetPreview: (state, action) => {
      state.preview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productHandle.pending, (state) => {
        state.loading = true;
      })

      .addCase(productHandle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(productHandle.fulfilled, (state, action) => {
        state.loading = false;
        const operationType = action.meta.arg.type;
        if (operationType === 'get') {
          state.items = action.payload;
        } else if (operationType === 'add') {
          state.items.push(action.payload);
        } else if (operationType === 'delete') {
          state.items = [...state.items].filter(
            (item) => item._id !== action.payload._id
          );
        } else {
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
        }
      });
  },
});
export const { setSearchValue, setProducts, setPreview, resetPreview } =
  productSlice.actions;

export default productSlice.reducer;
