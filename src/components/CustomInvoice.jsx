import { useEffect, useState } from "react";
import { HiOutlineTrash, HiDocumentText, HiEyeOff, HiOutlineMinusSm, HiOutlinePlusSm, HiCurrencyDollar, HiPrinter } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useOrder } from "../hooks/useOrder";
import { customClass } from "../constants/colors";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { dataPedidoBuscado } from "../mocks/data";
import { CustomTicket } from "./CustomTicket";
import { obtenerFechaHoraActual } from "../utilities";
import { useAuthStore } from "../hooks/useAuthStore";

export const CustomInvoice = ({ initialOrderId, initialStatus }) => {
    const { user } = useAuthStore();
    const { setOrder, setType, setCustomer, setTotal, setAction, getOrderId, finishOrder } = useOrder();
    const [orderId, setOrderId] = useState(initialOrderId ?? getOrderId);
    const [detalles, setDetalles] = useState({});
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(initialStatus);
    const [invoiceVisible, setInvoiceVisible] = useState(true);
    const { cleanCart } = useShoppingCart();
    const [efectivo, setEfectivo] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [venta, setVenta] = useState({})
    const getEfectivo = 13;
    const handleChangeEfectivo = (event) => {
        const inputValue = event.target.value;
        // Utilizamos una expresión regular para permitir solo números con hasta dos decimales
        if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
            setEfectivo(inputValue);
        }
    };
    const navigate = useNavigate();

    const handleAdd = (producto) => {
        if (producto.cantidad < producto.stock) {
            const updatedInvoice = data.map(item =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            );
            setData(updatedInvoice);
        }
    };

    const handleSubtract = (producto) => {
        if (producto.cantidad === 1) {
            const productId = producto.id;
            // Remover producto si cantidad es 1
            const index = data.findIndex(producto => producto.id === productId);
            removeProducts(index);
        } else {
            const updatedInvoice = data.map(item =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item
            );
            setData(updatedInvoice);
        }
    };
    const removeProducts = (index) => {
        const updatedInvoice = data.filter((_, i) => i !== index);
        setData(updatedInvoice);
    }

    const getCostoPedido = () => {
        if(status === 'Pagado'){
            return data.reduce((total, producto) => {
                if (selectedProducts.includes(producto.id)) {
                    return total + (producto.precioUnitario * producto.cantidad);
                }
                return total;
            }, 0);
        }
        else{
            return data.reduce((total, producto) => total + (producto.precioUnitario * producto.cantidad), 0);
        }
       
    };
    
    const getSubtotal = () => {
        const subTotal = getCostoPedido() - getDescuento();
        return subTotal;
    }

    const getDescuento = () => {
        return getCostoPedido() * 0.0;
    }

    const getTotal = () => {
        const total = getSubtotal() - getDescuento();
        return total;
    }

    const getVuelto = () => {
        if(status === 'Pagado'){
            if(selectedProducts.length === data.length){
                return getEfectivo - getTotal();
            }
            else{
                return 0;
            }
        }
        else{
            return efectivo - getTotal();
        }
    }

    useEffect(() => {
        const idPedido = initialOrderId ?? getOrderId;
        setOrderId(idPedido);
        // Obtenemos los detalles desde la base de datos segun idPedido
        setDetalles({
            customerId: dataPedidoBuscado[0].idCliente,
            orderType: dataPedidoBuscado[0].tipoPedido,
            tableId: dataPedidoBuscado[0].idMesa,
        });
        setData(dataPedidoBuscado[0].productos); // Obtenemos los productos para el pedido registrados en la base de datos
        setSelectedProducts(dataPedidoBuscado[0].productos.map(producto => producto.id)); // Aquí se mapea 'productos' en lugar de 'dataPedidoBuscado[0]'
        setStatus(initialStatus);
    }, [initialOrderId, initialStatus]);


    const handleCheckboxChange = (productoId) => {
        if (selectedProducts.includes(productoId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productoId));

        } else {
            setSelectedProducts([...selectedProducts, productoId]);
        }
    };


    const handlePagar = () => {
        try {
            if (getVuelto() < 0) {
                throw new Error('Monto insuficiente.');
            }
            else {
                Swal.fire({
                    title: "¿Desea registrar el pago?",
                    showCancelButton: true,
                    confirmButtonText: "Continuar",
                    cancelButtonText: "Salir",
                    customClass: customClass,
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Reiniciar estado de orden y carrito
                        finishOrder();
                        cleanCart();
                        setStatus('Pagado');
                    }
                });
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#63D02B',
                customClass: customClass,
            });
        }
    }
    const handleAgregarProducto = () => {
        if (orderId) {
            Swal.fire({
                title: "¿Desea agregar más productos a esta orden?",
                showCancelButton: true,
                confirmButtonText: "Continuar",
                cancelButtonText: "Salir",
                customClass: customClass,
            }).then((result) => {
                if (result.isConfirmed) {
                    setOrder(orderId);
                    setCustomer(detalles.customerId);
                    setType(detalles.orderType);
                    setAction('Actualizar');
                    navigate('/employee/home');
                }
            });
        }
        else {
            Swal.fire({
                title: 'Error',
                text: 'No se seleccionó un ID de Pedido',
                icon: 'error',
                confirmButtonColor: '#63D02B',
                customClass: customClass,
            });
        }

    }
    useEffect(() => {
        if(status === 'Pagado'){
            let efectivoTemp;
            if(selectedProducts.length < data.length){
                efectivoTemp = getTotal();
                setEfectivo(efectivoTemp);
            }
            else{
                efectivoTemp = getEfectivo;
                setEfectivo(efectivoTemp);
            }
     
            const productosSeleccionados = data.filter(producto => selectedProducts.includes(producto.id));
            setVenta({
                idTicket: 'B001-000005',
                idPedido: orderId,
                idMesa: detalles.tableId,
                fechaHora: obtenerFechaHoraActual(),
                cajero: 'Gianfranco Lopez',
                mozo: user.name,
                subtotal: getSubtotal(),
                descuento: getDescuento(),
                igv: 0.00,
                total: getTotal(),
                efectivo: parseFloat(efectivoTemp),
                vuelto: getVuelto(),
                productos: productosSeleccionados
            }
            );
        }
       
    }, [selectedProducts]);

    return (
        <div className={`relative ${invoiceVisible ? 'w-6/12' : ''} max-md:w-full`}>
            <button className="font-bold py-2 px-4 rounded absolute top-4 right-4" onClick={() => setInvoiceVisible(!invoiceVisible)}>
                {invoiceVisible ? <HiEyeOff /> : <HiDocumentText />}
            </button>
            <div className={`bg-secondary-light dark:bg-secondary-dark rounded-lg p-4 ${invoiceVisible ? '' : 'hidden'}`}>
                <h2 className="mb-2">Pedido #{orderId}</h2>

                <div className="flex justify-between">
                    <h3 className="mb-4">{detalles.customerId && (`Cliente #${detalles.customerId}`)}</h3>
                    <h3>{detalles.orderType && (detalles.orderType)} {detalles.tableId && (` - T${detalles.tableId}`)}</h3>
                </div>
                <div className="tableWrap">
                    <table className="w-full">
                        <thead>
                            <tr>
                                {status === 'Pagado' && (<th className="text-left p-4 border-b bg-secondary-light dark:bg-secondary-dark"></th>)}
                                <th className="text-left p-4 border-b bg-secondary-light dark:bg-secondary-dark">Item</th>
                                <th className="text-left p-4 border-b text-center bg-secondary-light dark:bg-secondary-dark">Cantidad</th>
                                <th className="text-left p-4 border-b text-end bg-secondary-light dark:bg-secondary-dark">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((producto, index) => (
                                <tr key={index}>
                                    {status === 'Pagado' && (
                                        <td>
                                            <input type="checkbox" id={producto.id} value={producto.id} checked={selectedProducts.includes(producto.id)} onChange={() => handleCheckboxChange(producto.id)} />
                                        </td>
                                    )}
                                    <td className="px-2 py-1">
                                        <div className="flex items-center">
                                            <div>
                                                <p>{producto.nombre}</p>
                                                <p>S/. {producto.precioUnitario.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className=" flex justify-center items-center">
                                            {(status !== 'Pagado' && status !== null) && (
                                                <button className="btn-secondary w-5 h-5" onClick={() => handleSubtract(producto)}>
                                                    <HiOutlineMinusSm className="h-3 w-3" />
                                                </button>
                                            )}

                                            <span className="mx-2">{producto.cantidad}</span>

                                            {(status !== 'Pagado' && status !== null) && (
                                                <button className="btn-secondary w-5 h-5">
                                                    <HiOutlinePlusSm className="h-3 w-3" onClick={() => handleAdd(producto)} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-1">
                                        <div className="flex flex-col items-end min-w-20">
                                            <p>S/. {(producto.precioUnitario * producto.cantidad).toFixed(2)}</p>
                                            {(status !== 'Pagado' && status !== null) && (<a href="#" onClick={() => removeProducts(index)} className="mt-2 inline-block border border-red-500 rounded p-2">
                                                <HiOutlineTrash className="text-red-500" />
                                            </a>)}
                                        </div>
                                    </td>

                                </tr>
                            ))}

                            {(status !== 'Pagado' && status !== null && data.length > 0) && (
                                <tr>
                                    <td colSpan="3">
                                        <div className="flex justify-center">
                                            <button className="btn-primary-outline flex items-center" onClick={handleAgregarProducto}>
                                                Agregar producto <HiOutlinePlusSm className="ml-2" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {data.length > 0 ? (
                    <div>
                        <div className="my-2 bg-primary-light dark:bg-primary-dark rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <h4 className="my-0">Subtotal</h4>
                                <p className="font-semibold">S/. {getSubtotal().toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="my-0">Descuento</h4>
                                <p className="font-semibold">S/. {getDescuento().toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="my-0">Total</h4>
                                <p className="font-semibold">S/. {getTotal().toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="my-0">Efectivo {status !== 'Pagado' && ('(S/.)')}</h4>
                                {status === 'Pagado' ?
                                    (<p className="font-semibold">S/. {parseFloat(efectivo).toFixed(2)}</p>) :
                                    (<input
                                        name="efectivo"
                                        type="text"
                                        className="primary-input !p-2 w-16 text-center"
                                        value={efectivo}
                                        onChange={handleChangeEfectivo}
                                    ></input>)}

                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="my-0">Vuelto</h4>
                                <p className="font-semibold">S/. {getVuelto().toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="mt-2">
                            {status === 'Pagado' ? (
                                // <button className="my-2 btn-success flex items-center justify-center w-full" onClick={handleImprimir}>
                                //     <HiPrinter className="mr-2" />
                                //     Imprimir
                                // </button>
                                <CustomTicket venta={venta}></CustomTicket>
                            )
                                : (<button className="btn-primary flex items-center justify-center w-full" onClick={handlePagar}>
                                    <HiCurrencyDollar className="mr-2" />
                                    Pagar
                                </button>)}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No hay items.</p>
                )}
            </div>
        </div>
    );
}
