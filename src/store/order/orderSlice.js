import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderId: null,
    orderType: null,
    totalPrice: null,
    orderNote: null,
    orderAction: null,
    customerId: null,
    tableId: null,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderId: (state, action) => {
            state.orderId = action.payload;
        },
        setOrderType: (state, action) => {
            state.orderType = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        setOrderNote: (state, action) => {
            state.orderNote = action.payload;
        },
        setOrderAction: (state, action) => {
            state.orderAction = action.payload;
        },
        setCustomerId: (state, action) => {
            state.customerId = action.payload;
        },
        setTableId: (state, action) => {
            state.tableId = action.payload;
        },
        resetOrderState: (state) => {
            state.orderId = initialState.orderId;
            state.orderType = initialState.orderType;
            state.totalPrice = initialState.totalPrice;
            state.orderNote = initialState.orderNote;
            state.orderAction = initialState.orderAction;
            state.customerId = initialState.customerId;
            state.tableId = initialState.tableId;
        },
    },
});

export const { setOrderId, setOrderType, setTotalPrice, setOrderNote, setOrderAction, setCustomerId, setTableId, resetOrderState } = orderSlice.actions;