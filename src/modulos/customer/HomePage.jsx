import { NavLink } from "react-router-dom";
import { HiDeviceMobile } from 'react-icons/hi';
import { backgroundImageUrl, sizeIcons } from "../../constants/constants";
import { presentacion, servicios, trabajarConNosotros } from "../../mocks/data";
import { useLanguage } from "../../hooks/useLanguage";

export const HomePage = () => {
  const { language } = useLanguage();
  const dataPresentacion = presentacion.find(presentacion => presentacion.idioma === language)['base'];
  const dataServicios = servicios.find(servicio => servicio.idioma === language);
  const dataTrabajarConNosotros = trabajarConNosotros.find(trabajarConNosotros => trabajarConNosotros.idioma === language);
  return (
    <div className="container-page">
      {/* Sección de presentación */}
      <div className="sm:flex justify-center items-center h-screen relative mx-10">
        {/* Contenedor del Texto (Columna 2) */}
        <div className="sm:w-2/4 max-sm:w-full max-sm:my-8 text-center sm:order-2">
          {dataPresentacion &&
            dataPresentacion.map((presentacion, index) => (
              <div key={index}>
                <h1>{presentacion.title}</h1>
                <p>{presentacion.description}</p>
              </div>
            ))}
        </div>
        {/* Contenedor de la Imagen (Columna 1) */}
        <div className="sm:w-2/4 max-sm:w-full sm:order-1 sm:mr-4">
          <img src="/assets/images/image-1.png" alt="Phentta" className="w-full" />
        </div>
      </div>
      {/* Sección de servicios */}
      <div className="flex flex-col justify-center items-center relative p-4">
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
      {/* Sección de Por qué trabajar con nosotros */}
      <div className="flex flex-col justify-center items-center relative p-4">
        {dataTrabajarConNosotros['titulo'] && (
          <h1>{dataTrabajarConNosotros['titulo']}</h1>
        )}
        <div className="sm:flex justify-center items-center relative mx-10">
          <div className="sm:w-2/4 max-sm:w-full grid grid-cols-1 gap-6">
            {dataTrabajarConNosotros['base'] && dataTrabajarConNosotros['base'].map((razones, index) => (
              <div key={index} className="background-secondary rounded-lg shadow p-4">
                <div className="flex"><h1 className="mr-2">{index+1}</h1><h2 className="mt-2">{razones.title}</h2></div>
                <p>{razones.description}</p>
              </div>
            ))}
          </div>
          <div className="sm:w-2/4 max-sm:w-full max-sm:mt-4 sm:ml-4">
            <img src="/assets/images/image-2.png" alt="Phentta" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
