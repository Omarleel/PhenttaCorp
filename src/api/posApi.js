import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const posApi = axios.create({
    baseURL: VITE_API_URL
});

// Configuración de los interceptores
posApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
    }
    return config;
});

export default posApi;