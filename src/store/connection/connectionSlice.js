import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const connectionSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = connectionSlice.actions;

