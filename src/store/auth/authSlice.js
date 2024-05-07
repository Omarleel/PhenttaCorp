import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoginLoading: false,
    status: 'checking',
    user: {},
    errorMessage: null,
  },
  reducers: {
    onChecking: ( state ) => {
      state.isLoginLoading = true;
      state.status = 'checking';
      state.user= {};
      state.errorMessage = null;
    },
    onLogin: ( state, { payload }) => {
      state.isLoginLoading = false;
      state.status = 'authenticated';
      state.user = payload.user;
      state.errorMessage = undefined;
    },
    onLogout: ( state, { payload } ) => {
      state.isLoginLoading = false;
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: ( state ) => {
      state.errorMessage = undefined;
    }
  },
});

export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage
} = authSlice.actions;