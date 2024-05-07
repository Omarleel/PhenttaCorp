import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/connection/connectionSlice';


// Hook personalizado para acceder y gestionar el estado de carga
export const useConnection = () => {
  const dispatch = useDispatch();

  // Selector para obtener el estado de carga desde el store
  const isLoading = useSelector((state) => state.connection.isLoading);

  // Acción para cambiar el estado de carga
  const setLoadStatus = (status) => {
    dispatch(setLoading(status));
  };

  return { isLoading, setLoadStatus };
};
