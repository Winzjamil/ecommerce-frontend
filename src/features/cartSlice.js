import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const handleCart = createAsyncThunk(
  'cart/handleCart',
  async ({ action, type, id }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const cartList = state.cart.items.find((c) => c._id === id);

      if (type === 'addToCart') {
        const items = state.product.items.find((p) => p._id === id);
        if (!items) {
          return rejectWithValue('no products found');
        }
        const updatedCart = {
          ...items,
          quantity: 1,
          stock: items.quantity,
          unitPrice: items.price,
        };

        const alreadyInCart = state.cart.items.some((c) => c._id === id);
        if (alreadyInCart) {
          return;
        }

        const cartRes = await fetch('http://localhost:8080/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedCart),
        });

        const result = await cartRes.json();
        return result.data;
      }

      if (type === 'fetch') {
        const response = await fetch('http://localhost:8080/cart');
        const result = await response.json();
        return result.data; // array of cart items
      }

      if (type === 'update') {
        if (!cartList) {
          return rejectWithValue('item not found');
        }
        const updatedCart = { ...cartList };
        if (action === 'add') {
          updatedCart.quantity = Number(updatedCart.quantity || 1) + 1;
          updatedCart.stock = Number(updatedCart.stock - 1);
        } else {
          updatedCart.quantity = Number(updatedCart.quantity || 1) - 1;
          updatedCart.stock = Number(updatedCart.stock + 1);
        }
        if (updatedCart.quantity <= 0) {
          const response = await fetch(`http://localhost:8080/cart/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete cart item');
          }
          return { _id: id, deleted: true };
        }
        updatedCart.price = updatedCart.unitPrice * updatedCart.quantity;

        const response = await fetch(`http://localhost:8080/cart/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedCart),
        });

        if (!response.ok) {
          throw new Error('Failed to update cart item');
        }

        const result = await response.json();
        return result;
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
// 🔹 Slice
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

        const operationType = action.meta.arg.type; // ← this is the "type" passed to thunk

        if (operationType === 'addToCart') {
          state.items.push(action.payload);
        } else if (operationType === 'fetch') {
          state.items = action.payload;
        } else if (operationType === 'update') {
          const updatedItem = action.payload;

          if (updatedItem.deleted) {
            state.items = state.items.filter(
              (item) => item._id !== updatedItem._id
            );
            return;
          }
          const index = state.items.findIndex(
            (item) => item._id === updatedItem._id
          );

          if (index !== -1) {
            state.items[index] = updatedItem;
          }
        }
      });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
