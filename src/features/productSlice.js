import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const productHandle = createAsyncThunk(
  'product/productHandle',
  async ({ id, type, newProduct }, { rejectWithValue }) => {
    try {
      if (type === 'fetch') {
        const res = await fetch('http://localhost:8080/product');
        const result = await res.json();
        return result.data;
      }

      if (type === 'add') {
        const productResponse = await fetch('http://localhost:8080/product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });

        if (!productResponse.ok) {
          return rejectWithValue(productResponse.message);
        }
        const result = await productResponse.json();
        return result;
      }

      if (type === 'delete') {
        const res = await fetch(`http://localhost:8080/product/${id}`, {
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
  },

  reducers: {},
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
        if (operationType === 'fetch') {
          state.items = action.payload;
        } else if (operationType === 'add') {
          state.items.push(action.payload);
        } else if (operationType === 'delete') {
          const deletedId = action.payload._id;
          state.items = state.items.filter((item) => item._id !== deletedId);
        }
      });
  },
});
export const {} = productSlice.actions;

export default productSlice.reducer;
