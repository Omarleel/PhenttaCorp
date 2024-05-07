import { useDispatch, useSelector } from 'react-redux';
import { setShoppingCart, cleanShoppingCar } from '../store';

export const useShoppingCart = () => {
  const dispatch = useDispatch();

  const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);

  const setProducts = (shoppingCart) => {
    dispatch(setShoppingCart(shoppingCart));
  };

  const removeProducts = (index) => {
    const updatedCart = shoppingCart.filter((_, i) => i !== index);
    dispatch(setShoppingCart(updatedCart));
  };

  const cleanCart = () => {
    dispatch(cleanShoppingCar());
  }

  return { setProducts, removeProducts, cleanCart, shoppingCart };
};
