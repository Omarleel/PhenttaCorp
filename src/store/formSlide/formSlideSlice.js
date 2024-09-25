import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: 0,
    formData: {},
};

export const formSlideSlice = createSlice({
    name: 'formSlide',
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        setFormData: (state, action) => {
            // Fusionar los nuevos datos con el estado existente usando spread operator
            state.formData = {
                ...state.formData, // Copia superficial del objeto formData existente
                ...action.payload, // Nuevos datos a fusionar
            };
        },
        resetFormSlideState: (state) => {
            state.currentStep = initialState.currentStep;
            state.formData = initialState.formData;
        },
    },
});

export const { setCurrentStep, setFormData, resetFormSlideState } = formSlideSlice.actions;