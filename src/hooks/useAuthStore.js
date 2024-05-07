import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';;
import Swal from 'sweetalert2';
import posApi from '../api/posApi';

export const useAuthStore = () => {
  const { status, user, errorMessage, isLoginLoading } = useSelector( state => state.auth );

  const dispatch = useDispatch();
  const token = localStorage.getItem( 'token' );
  const config = {
    headers: {
      Authorization: `Bearer ${ token }`
    }
  }

  const startLogin = async({ email, password }) => {
    dispatch( onChecking() );
    try {
      const { data } = await posApi.post('/login',{ email, password });
      if (data.token){
        localStorage.setItem( 'token', data.token );
        localStorage.setItem( 'token-init-date', new Date().getTime() );
        dispatch( onLogin( data ));
      }
      else{
        throw new Error('No se recibió un token en la respuesta del servidor.');
      }
      
    } catch ( error ) {
      let errorMessage = 'Error de conexión';
      if ( error.response && error.response.data && error.response.data.msg ) {
        errorMessage = error.response.data.msg;
      }
      Swal.fire({   
        title: 'Error en el Inicio de Sesión',
        text: errorMessage,
        icon: 'error',
        background: '#2e2e2e',
        color: 'white',
        confirmButtonColor: '#63D02B',
      });
      dispatch( onLogout( errorMessage ));
      setTimeout( () => {
        dispatch( clearErrorMessage() );
      }, 10 );
    }
  }

  const checkAuthToken = async() => {
    if( !token ) return dispatch( onLogout() );
    try{
      const { data } = await posApi.post( '/refresh', {}, config);
      if(data.message == 'Unauthenticated.'){
        throw new Error('Token inválido.');
      }
      else{
        localStorage.setItem( 'token', data.token );
        localStorage.setItem( 'token-init-date', new Date().getTime() );
        dispatch( onLogin( data ));
      }
    }catch( error ) {
      localStorage.clear();
      let errorMessage = 'Error de conexión';
      if ( error.response && error.response.data && error.response.data.msg ) {
        errorMessage = error.response.data.msg;
      }
      dispatch( onLogout( errorMessage ));
      setTimeout( () => {
        dispatch( clearErrorMessage() );
      }, 10 );
    }
  }

  const startLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        dispatch(onLogout());
      }
    });
  }

  return {
    /* Propiedades */
    isLoginLoading,
    status,
    user,
    errorMessage,

    /* Metodos */
    startLogin,
    startLogout,
    checkAuthToken,
  }
}