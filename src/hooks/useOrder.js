import { useDispatch, useSelector } from 'react-redux';
import { setOrderId, setOrderType, setTotalPrice, setOrderNote, setOrderAction, setCustomerId, setTableId, resetOrderState } from '../store';

export const useOrder = () => {
  const dispatch = useDispatch();

  const setOrder = (id) => {
    dispatch(setOrderId(id));
  };
  const setType = (id) => {
    dispatch(setOrderType(id));
  };
  const setTotal = (price) => {
    dispatch(setTotalPrice(price));
  };
  const setNote = (note) => {
    dispatch(setOrderNote(note));
  };
  const setAction = (action) => {
    dispatch(setOrderAction(action));
  }
  const setCustomer = (id) => {
    dispatch(setCustomerId(id));
  };
  const setTable = (id) => {
    dispatch(setTableId(id));
  };
  const finishOrder = () => {
    dispatch(resetOrderState());
  }

  const getOrderId = useSelector((state) => state.order.orderId);
  const getOrderType = useSelector((state) => state.order.orderType);
  const getTotalPrice = useSelector((state) => state.order.totalPrice);
  const getOrderNote = useSelector((state) => state.order.orderNote);
  const getOrderAction = useSelector((state) => state.order.orderAction);
  const getCustomerId = useSelector((state) => state.order.customerId);
  const getTableId = useSelector((state) => state.order.tableId);

  return {
    setOrder, setType, setTotal, setNote, setAction, setCustomer, setTable,
    getOrderId, getOrderType, getTotalPrice, getOrderNote, getOrderAction, getCustomerId, getTableId,
    finishOrder
  };
};
