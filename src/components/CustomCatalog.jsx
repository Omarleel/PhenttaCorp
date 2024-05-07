import React, { useEffect, useState } from "react";
import { HiShoppingCart, HiHeart } from "react-icons/hi";
import { useOrder } from "../hooks/useOrder";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { obtenerPrecios } from "../utilities/utils";
import { sizeIcons } from "../constants/constants";
import Cookies from 'js-cookie';
import { useFavorite } from "../hooks/useFavorite";
import Swal from 'sweetalert2';

export const CustomCatalog = ({
    data,
    dynamicData = { fetchData: null },
    }) => {
    const [currentData, setCurrentData] = useState([]);
    // Paginación
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [paginaActual, setPaginaActual] = useState(1);
    const [itemsPorPagina, setItemsPorPagina] = useState(8);
    // Filtros
    const [filtros, setFiltros] = useState({
        categoria: ['Smartphones', 'Tablets', 'Accesorios'],
        precioMinimo: 0,
        precioMaximo: null,
        orden: 'Predeterminado', // Predeterminado - Ultimos lanzamientos - Precio: bajo a alto - Precio: Alto a bajo
        marcas: ['Xiaomi', 'Samsung', 'Motorola', 'Huawei'],
    });
    const [loadingData, setLoadingData] = useState(true);
    const { getFavorites, setFavoriteProduct } = useFavorite();
    const { setProducts, shoppingCart } = useShoppingCart();
    const { setOrder } = useOrder();
    const orderId = 100;
    const porcentajeDescuento = 0.10;
    
    const indexOfLastItem = dynamicData.fetchData !== null ? itemsPorPagina : paginaActual * itemsPorPagina;
    const indexOfFirstItem = dynamicData.fetchData !== null ? 0 : indexOfLastItem - itemsPorPagina;

    if (dynamicData.fetchData !== null) {
        // Datos dinámicos
        const fetchDataAsync = async () => {
            try {
                setCurrentData([]);
                setLoadingData(true);
                const { responseData, totalPaginas: totalPages } = await dynamicData.fetchData(itemsPorPagina, paginaActual, filtros);
                if(responseData.length > 0){
                    setTotalPaginas(totalPages);
                    setCurrentData(responseData[0].productos);
                    setLoadingData(false);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error,
                    icon: 'error',
                    background: '#2e2e2e',
                    color: 'white',
                    confirmButtonColor: '#63D02B',
                });
            }
        }
        useEffect(() => {
           fetchDataAsync();
        }, [itemsPorPagina, paginaActual])
        
    }
    else {
        // Datos estáticos
        useEffect(() => {
            if(data.length > 0){
                const startIndex = (paginaActual - 1) * itemsPorPagina;
                const endIndex = startIndex + itemsPorPagina;
                const productos = data[0]?.productos || [];
                setTotalPaginas(data[0].totalPaginas);
                setCurrentData(productos.slice(startIndex, endIndex))
            }
        }, [data, itemsPorPagina, paginaActual]);
    }

    const handlePageChange = async (pageNumber) => {
        setPaginaActual(pageNumber);
    }
    
    const handleProduct = (id) => {
        const productIndex = currentData.findIndex(producto => producto.id === id);
        const updatedProducts = [...currentData];
        const productToUpdate = updatedProducts[productIndex];

        if (productToUpdate.stock > 0) {
            const cartProduct = shoppingCart.find(item => item.id === id);
            if (cartProduct) {
                // Si el producto ya está en el carrito, aumenta la cantidad
                setProducts(shoppingCart.map(item =>
                    item.id === id && item.cantidad < item.stock ? { ...item, cantidad: item.cantidad + 1 } : item
                ));
            } else {
                // Si el producto no está en el carrito, agrégalo con cantidad 1
                setProducts([...shoppingCart, { ...productToUpdate, cantidad: 1 }]);
            }
            setOrder(orderId);
        }
    };

    const handleFavorito = (producto) => {
        if ( isFavorite(producto) ) {
            // Si el producto ya está en favoritos, eliminarlo
            const nuevosFavoritos = getFavorites.filter((fav) => fav.id !== producto.id);
            setFavoriteProduct(nuevosFavoritos);
            Cookies.set('favoritos', JSON.stringify([ 
                {categoria : 'Favoritos', productos : nuevosFavoritos} 
                ]), 
                { expires: 90 }
            );
        } else {
            // Si el producto no está en favoritos, agregarlo
            const nuevosFavoritos = [...getFavorites, producto];
            setFavoriteProduct(nuevosFavoritos);
            Cookies.set('favoritos', JSON.stringify([ 
                    {categoria : 'Favoritos', productos : nuevosFavoritos} 
                ]), 
                { expires: 90 }
            );
        }
    };

    const isFavorite = (producto) => {
        return getFavorites.some((fav) => fav.id === producto.id);
    }

    useEffect(() => {
        // Obtener la lista actual de favoritos de la cookie
        const cookieFavoritos = Cookies.get('favoritos');
        
        if (cookieFavoritos) {
            // Parsear los favoritos desde la cookie
            const favoritosDesdeCookie = JSON.parse(cookieFavoritos);
    
            // Verificar si hay productos dentro de favoritos guardados en la cookie
            if (Array.isArray(favoritosDesdeCookie) && favoritosDesdeCookie.length > 0) {
                // Filtrar y obtener solo los productos del objeto de favoritos guardado en la cookie
                const productosFavoritos = favoritosDesdeCookie.find(fav => fav.categoria === 'Favoritos');
    
                if (productosFavoritos) {
                    // Establecer los favoritos en el estado con los productos guardados en la cookie
                    setFavoriteProduct(productosFavoritos.productos);
                }
            }
        }
    }, []);
    
    return (
        <div className="w-full">
            {
                currentData.length > 0 ? (
                <div className="@container">
                    {/* Gridview */}
                    <div className="grid grid-cols-1 @xs:grid-cols-2 @xl:grid-cols-3 @2xl:grid-cols-4 @3xl:grid-cols-5 @5xl:grid-cols-6 gap-4 p-4">
                        {currentData.map((producto, index) => {
                            const { precioFinal, precioSinDescuento } = obtenerPrecios(producto.precioUnitario, porcentajeDescuento);
                            return (
                                <div
                                    key={index}
                                    className="w-42 rounded-lg cursor-pointer background-secondary h-auto p-4 text-center transition duration-300 transform hover:scale-105 flex flex-col justify-between"
                                    onClick={() => false}
                                >
                                    <div className="relative">
                                        <HiHeart
                                            className={`absolute top-0 left-0 border-2 rounded-full m-2 z-10 hover:scale-110
                                                ${isFavorite(producto) ? 'text-red-500 border-red-500' : 'text-gray-400 border-gray-400'}`
                                            }
                                            size={sizeIcons}
                                            onClick={() => handleFavorito(producto)}
                                        />
                                        <img
                                            src={`${producto.imagen}`}
                                            className="max-w-36 max-h-36 w-full h-36 object-cover mx-auto"
                                            alt={producto.nombre}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow justify-between">
                                        <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                                        <div className="mt-auto flex justify-between items-end">
                                            <span className="text-sm text-gray-500 line-through">S/. {precioSinDescuento}</span>
                                            <span className="text-base font-bold">S/. {precioFinal}</span>
                                        </div>
                                        <button
                                            className="btn-primary flex items-center justify-center w-full mt-2"
                                            onClick={() => handleProduct(producto.id)}
                                        >
                                            <HiShoppingCart /> <h5 className="!text-white">Agregar al carrito</h5>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Paginación */}
                    <ul className="flex justify-center my-4 background-secondary">
                        {Array.from({ length: totalPaginas }).map((_, index) => (
                            <li
                                key={index}
                            >
                                <button onClick={() => handlePageChange(index + 1)}
                                    className={`cursor-pointer ${paginaActual === index + 1
                                        ? 'btn-primary'
                                        : 'btn-primary-outline'
                                        }`}>{index + 1}</button>

                            </li>
                        ))}
                    </ul>
                </div>
                )
                : (
                    <div className="flex flex-col items-center justify-center h-36">
                        <h3 className="text-gray-800">Aquí no hay nada aún, vuelve más tarde :)</h3>
                    </div>
                )
            }
         
        </div>
    );
};
