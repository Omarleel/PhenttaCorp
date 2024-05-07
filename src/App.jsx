import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { AppRouter } from './router/AppRouter';
import { nombreOrganizacion, rutaFavicon } from "./constants/constants";

if(rutaFavicon != null && rutaFavicon.trim() !== ""){
  document.querySelector('link[rel="icon"]').setAttribute('href', rutaFavicon);
}
if(nombreOrganizacion != null && nombreOrganizacion.trim() !== ""){
  document.title = nombreOrganizacion;
}
  
export const App = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
