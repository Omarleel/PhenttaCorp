import { useDispatch, useSelector } from 'react-redux';
import { addTable, removeTable, removeRowTable, editTable, resetTableState } from '../store';
import { useEffect } from 'react';

export const useTable = (id, table) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(id !== undefined && table !== undefined){
      dispatch(addTable({ id, table }));
    }
  }, []);

  const removeCustomTable = (id) => {
    dispatch(removeTable({ id }));
  };
  const removeRowCustomTable = (id, rowIndex) => {
    dispatch(removeRowTable({ id, rowIndex }));
  };
  const editCustomTable = (id, table) => {
    dispatch(editTable({ id, table }));
  };
  const resetData = () => {
    dispatch(resetTableState());
  };

  const getTables = useSelector((state) => state.tables.tables);

  const getTableById = (id) => {
    const foundTable = getTables.find(table => table.id === id);
    return foundTable ? foundTable.table : [];
  };

  return {
    removeCustomTable,
    removeRowCustomTable,
    editCustomTable,
    resetData,
    getTables,
    getTableById,
  };
};