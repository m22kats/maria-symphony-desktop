import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageSize: 10,
};

const pageSizeSlice = createSlice({
  name: 'pageSize',
  initialState,
  reducers: {
    changePageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const { changePageSize } = pageSizeSlice.actions;

export const pageSizeReducer = pageSizeSlice.reducer;
