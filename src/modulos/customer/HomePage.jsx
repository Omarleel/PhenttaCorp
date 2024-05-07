import { NavLink } from "react-router-dom";
import { HiDeviceMobile } from 'react-icons/hi';
import { backgroundImageUrl, sizeIcons } from "../../constants/constants";
import { presentacion, servicios } from "../../mocks/data";
import { useLanguage } from "../../hooks/useLanguage";

export const HomePage = () => {
  const { language } = useLanguage();
  const dataPresentacion = presentacion.find(presentacion => presentacion.idioma === language)['base'];
  const dataServicios = servicios.find(servicio => servicio.idioma === language);
  return (
    <div className="container-page">
      <div className="sm:flex justify-center items-center h-screen relative mx-10">
        <div className="sm:w-2/4"><img src=""></img></div>
        <div className="sm:w-2/4 max-sm:my-8 text-center">
          {dataPresentacion && dataPresentacion.map((presentacion, index) => (
            <div key={index}>
              <h1>{presentacion.title}</h1>
              <p>
                {presentacion.description}
              </p>
            </div>
          ))}

        </div>
      </div>
      <div className="flex flex-col justify-center items-center relative space-10 p-4">
        {dataServicios['titulo'] && (
          <h1>{dataServicios['titulo']}</h1>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataServicios['base'] && dataServicios['base'].map((service, index) => (
            <div key={index} className="background-secondary rounded-lg shadow p-4">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
