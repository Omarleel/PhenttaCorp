import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalId: null,
    formId: null,
    formAction: null,
  },
  reducers: {
    // openModal: (state, action) => {
    //   state.isOpen = true;
    //   state.modalId = action.payload;
    // },
    // closeModal: (state) => {
    //   state.isOpen = false;
    //   state.modalId = null;
    // },
    toggleModal: (state, action) => {
      state.isOpen = !state.isOpen;
      state.modalId = action.payload;
    },
    setFormId: (state, action) => {
      state.formId = action.payload;
    },
    setFormAction: (state, action) => {
      state.formAction = action.payload;
    },
  },
});

export const { openModal, closeModal, toggleModal, setFormId, setFormAction } = modalSlice.actions;
