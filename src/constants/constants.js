export const nombreOrganizacion = "Phentta";
export const dominio = "phentta.com";
export const direccion = "Av. de la Participación 638";
export const RUC = "10716673788";
export const celular = "917800710";
export const correo = "contacto@phentta.com";
// Redes sociales
export const urlFacebook = "https://www.facebook.com/phentta.com";
export const urlInstagram = "https://www.instagram.com/phentta.com";
export const urlYoutube = "#";
// Assets (imagenes)
export const rutaLogoPimarioDark = "/assets/images/primary-logo-dark.png";
export const rutaLogoPimarioLight = "/assets/images/primary-logo-light.png";
export const rutaLogoSecundario = "/assets/images/secondary-logo.png";
export const rutaFavicon = "/assets/images/favicon.ico";
export const rutaProfilePreview = "/assets/images/profile.png"
export const backgroundImageUrl = "/assets/images/background.jpg";
// Otros
export const sizeIcons = 24;
// Estilo Toast
import Swal from 'sweetalert2';
export const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true
});