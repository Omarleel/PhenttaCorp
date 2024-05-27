import posApi from '../api/posApi';
import { useConnection } from "./useConnection";

export const useRegistrar = () => {
    // Utilizar el hook useLoading
    const { isLoading, setLoadStatus } = useConnection();

    // Método auxiliar para realizar la llamada a la API y gestionar la respuesta
    const handleApiCall = async (endpoint, dataEnviada) => {
        let response = {
            success: true,
            message: '',
            data: [],
        };

        try {
            setLoadStatus(true);
            const { data } = await posApi.post(endpoint, dataEnviada, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('dataEnviada',dataEnviada)
            console.log('dataRecibida', data)
            if (data.success === true) {
                response['data'] = data;
                delete response['data'].message;
                delete response['data'].success;
            } else {
                response['success'] = false;    
            }
            response['message'] = data.message ?? "";
        } catch (error) {
            response['success'] = false;
            response['message'] = error.message;
        } finally {
            setLoadStatus(false);
        }
        return response;
    };

    // Método para registrar vendedor
    // const registrarVendedor = async (dataEnviada) => {
    //     return handleApiCall('/propietario', dataEnviada);
    // };

     // Método para registrar propietario
     const sendContactEmail = async (dataEnviada) => {
        return handleApiCall('/send-email', dataEnviada);
    };
    return {
        /* Métodos */
        sendContactEmail,
    };
};
