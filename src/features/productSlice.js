import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    searchValue: '',
  },

  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});
export const { setSearchValue } = productSlice.actions;

export default productSlice.reducer;
