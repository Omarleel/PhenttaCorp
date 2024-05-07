import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tables: [
        // { 
        //     id: null,
        //     table: []
        // }
    ]
};

export const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        addTable: (state, action) => {
            const { id, table } = action.payload;
            const existingTable = state.tables.find(item => item.id === id);
            if (existingTable) {
                existingTable.table = table;
            } else {
                state.tables.push({ id, table });
            }
        },
        removeTable: (state, action) => {
            const { id } = action.payload;
            state.tables = state.tables.filter(table => table.id !== id);
        },
        removeRowTable: (state, action) => {
            const { id, rowIndex } = action.payload;
            const tableToUpdate = state.tables.find(item => item.id === id);
            if (rowIndex >= 0 && rowIndex < tableToUpdate.table.length) {
                tableToUpdate.table.splice(rowIndex, 1);
            }
        },
            
        editTable: (state, action) => {
            const { id, table } = action.payload;
            state.tables = state.tables.map(item =>
                item.id === id ? { ...item, table } : item
            );
        },
        resetTableState: (state) => {
            state.tables = initialState.tables;
        },
    },
});

export const { addTable, removeTable, removeRowTable, editTable, resetTableState } = tableSlice.actions;