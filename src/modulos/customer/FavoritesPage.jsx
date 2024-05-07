import { useEffect, useState } from "react"
import { CustomBanner } from "../../components/CustomBanner"
import { CustomCatalog } from "../../components/CustomCatalog"
import Cookies from 'js-cookie';
import { useFavorite } from "../../hooks/useFavorite";

export const FavoritesPage = () => {
    const [favoritos, setFavoritos] = useState([]);
    const {getFavorites} = useFavorite();
    useEffect(() => {
        const favoritos = [{categoria: 'Favoritos', productos: getFavorites}];
        setFavoritos(favoritos);
    }, [getFavorites])
    
  return (
    <div className="container-page">
        <CustomBanner></CustomBanner>
        <CustomCatalog
            data={favoritos}
        />
    </div>
  )
}
