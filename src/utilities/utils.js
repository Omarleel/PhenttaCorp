import { format, isValid, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';

export const formatearFechas = ({ data, clave = ['fechaHora'], formato = 'dd/MM/yyyy HH:mm' }) => {
    const formatearFechaProfunda = (objeto, claves) => {
        if (Array.isArray(objeto)) {
            return objeto.map(item => formatearFechaProfunda(item, claves));
        } else if (typeof objeto === 'object' && objeto !== null) {
            // Crear una copia del objeto para modificar
            const newObjeto = Object.assign({}, objeto);

            // Verificar si la clave es un array
            if (Array.isArray(claves)) {
                claves.forEach(clave => {
                    if (newObjeto.hasOwnProperty(clave)) {
                        const fecha = newObjeto[clave];
                        if (fecha && isValid(parseISO(fecha))) {
                            newObjeto[clave] = format(parseISO(fecha), formato, { locale: es });
                        }
                    }
                });
            } else {
                if (newObjeto.hasOwnProperty(claves)) {
                    const fecha = newObjeto[claves];
                    if (fecha && isValid(parseISO(fecha))) {
                        newObjeto[claves] = format(parseISO(fecha), formato, { locale: es });
                    }
                }
            }
            Object.keys(newObjeto).forEach(key => {
                newObjeto[key] = formatearFechaProfunda(newObjeto[key], claves);
            });
            return newObjeto;
        }
        return objeto;
    };

    return formatearFechaProfunda(data, clave);
};


export const obtenerFechaHoraActual = () => {
    const fechaActual = new Date();
    const horaFormateada = format(fechaActual, "yyyy-MM-dd HH:mm", { locale: es });
    return horaFormateada;
};

export const obtenerPrecios = (precioUnitario, porcentajeDescuento) => {
    const precioFinal = precioUnitario % 1 === 0 ?  (precioUnitario - 0.01).toFixed(2) : (parseInt(precioUnitario) + 0.99).toFixed(2);
    const precioSinDescuento = (Math.floor(precioUnitario / (1 - porcentajeDescuento)) + 0.99).toFixed(2);
    return {
        precioFinal: precioFinal,
        precioSinDescuento: precioSinDescuento
    };
};

export const formatearSubTotal = ({ data, clave = 'subTotal' }) => {
    const formatearSubTotalProfundo = (objeto, clave) => {
        // Verificar si el objeto es un arreglo
        if (Array.isArray(objeto)) {
            // Si es un arreglo, mapear cada elemento y llamar recursivamente a formatearSubTotalProfundo
            return objeto.map(item => formatearSubTotalProfundo(item, clave));
        } else if (typeof objeto === 'object' && objeto !== null) {
            // Si el objeto es un objeto y no es nulo, buscar la clave y formatear el subtotal
            if (objeto.hasOwnProperty(clave) && typeof objeto[clave] === 'number') {
                objeto[clave] = `S/. ${objeto[clave].toFixed(2)}`;
            }
            // Llamar recursivamente a formatearSubTotalProfundo para cada valor del objeto
            Object.keys(objeto).forEach(key => {
                objeto[key] = formatearSubTotalProfundo(objeto[key], clave);
            });
        }
        return objeto;
    };

    // Llamar a la función formatearSubTotalProfundo con el objeto de datos
    return formatearSubTotalProfundo(data, clave);
};


export const isDNI = (dni) => {
    // Verificar si el DNI tiene longitud 8 y todos los caracteres son numéricos
    return /^\d{8}$/.test(dni);
};

export const isRUC = (ruc) => {
    // Verificar si el RUC tiene longitud 11 y todos los caracteres son numéricos
    if (!/^\d{11}$/.test(ruc)) {
        return false;
    }
    let suma;
    let i;
    for (suma = - (ruc % 10 < 2), i = 0; i < 11; i++, ruc = ruc / 10 | 0) {
        suma += (ruc % 10) * (i % 7 + (i / 7 | 0) + 1);
    }
    // El dígito de control debe ser igual al dígito calculado
    return suma % 11 === 0;
};

import QRCode from 'qrcode';
export const generateQRCodeByLink = async (link) => {
    try {
        // Genera el código QR
        const dataURL = await QRCode.toDataURL(link);
        return dataURL;
    } catch (error) {
        console.error('Error al generar el código QR:', error);
        return null
    }
};

export const detectarDispositivo = () => {
    const esDispositivoMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const esTablet = /iPad/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const anchoPantalla = window.screen.width;
    const altoPantalla = window.screen.height;
    const esPantallaPequeña = Math.min(anchoPantalla, altoPantalla) <= 768; // Consideramos dispositivos con ancho o alto menor o igual a 768px como dispositivos móviles

    if (esDispositivoMovil) {
        if (esTablet) {
            return 'Tablet';
        } else if (esPantallaPequeña) {
            return 'Móvil';
        } else {
            return 'PC';
        }
    } else {
        return 'PC';
    }
}

import { celular, nombreOrganizacion } from '../constants/constants';
export const getWhatsappUrl = () => {
    const dispositivo = detectarDispositivo();
    if (dispositivo === 'PC') {
        return `https://web.whatsapp.com/send/?phone=51${celular}&text=Hola ${nombreOrganizacion}, quisiera contratar un servicio informático.`;
    }
    else{
        return `https://api.whatsapp.com/send/?phone=51${celular}&text=Hola ${nombreOrganizacion}, quisiera contratar un servicio informático.`;
    }
}