import { useDispatch, useSelector } from 'react-redux';
import { setFavorite, resetFavoriteState } from '../store';

export const useFavorite = () => {
  const dispatch = useDispatch();

  const setFavoriteProduct = (producto) => {
    dispatch(setFavorite(producto));
  };

  const cleanFavorites = () => {
    dispatch(resetFavoriteState());
  }

  const getFavorites = useSelector((state) => state.favorite.favorites);

  return {
    setFavoriteProduct, getFavorites, cleanFavorites
  };
};
