import posApi from '../api/posApi';
import { useConnection } from './useConnection';

export const useConsultar = () => {
  const { isLoading, setLoadStatus } = useConnection();

  const handleApiCall = async (endpoint) => {
    let response = {
      success: true,
      message: '',
      data: [],
    };

    try {
      setLoadStatus(true);
      const { data } = await posApi.get(endpoint);
      console.log('Datos obtenidos en la consulta (get): ', data)
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

  const getPersona = async (dni) => {
    return handleApiCall(`/persona/${dni}`);
  };

  const getRubros = async () => {
    return handleApiCall(`/rubro`);
  };

  const getVendedorPorDni = async (dni) => {
    return handleApiCall(`/propietario/${dni}`);
  };

  const getCarnetPorDni = async (dni) => {
    return handleApiCall(`/carnet/${dni}`);
  };
  const getCarnets = async (itemsPerPage, currentPage) => {
    return handleApiCall(`/carnet?numberItems=${itemsPerPage}&page=${currentPage}`);
  };

  const getInformacionComercial = async (ruc) => {
    return handleApiCall(`/persona/ruc/${ruc}`);
  };

  const getLicenciaPorDni = async (dni) => {
    return handleApiCall(`/licencia/${dni}`);
  };

  const getExpedirCarnet = async (dni) => {
    return handleApiCall(`/carnet/expedir/${dni}`);
  };

  const getExpedirLicencia = async (idNombreComerial) => {
    return handleApiCall(`/licencia/expedir/${idNombreComerial}`);
  };

  const getMulta = async (dni) => {
    // Método get
  };

  return {
    /* Métodos */
    getPersona,
    getRubros,
    getVendedorPorDni,
    getCarnetPorDni,
    getExpedirCarnet,
    getExpedirLicencia,
    getCarnets,
    getInformacionComercial,
    getLicenciaPorDni,
    getMulta,
  };
};