import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    searchVal: '',
    preview: null,
  },
  reducers: {
    setSearchVal: (state, action) => {
      state.searchVal = action.payload;
    },
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
    resetPreview: (state, action) => {
      state.preview = '';
    },
  },
});

export const productReducer = productSlice.reducer;
export const { setSearchVal, setPreview, resetPreview } = productSlice.actions;
