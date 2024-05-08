import { menus, presentacion, servicios, trabajarConNosotros } from "../../mocks/data";
import { useLanguage } from "../../hooks/useLanguage";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { CustomCarousel } from "../../components/CustomCarrousel";
import { CustomSVG } from "../../components/CustomSVG";
import { useTheme } from "../../hooks/useTheme";

export const HomePage = () => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const dataPresentacion = presentacion.find(presentacion => presentacion.idioma === language)['base'];
  const dataServicios = servicios.find(servicio => servicio.idioma === language);
  const dataTrabajarConNosotros = trabajarConNosotros.find(trabajarConNosotros => trabajarConNosotros.idioma === language);
  const location = useLocation();
  const menuBase = menus.find(menu => menu.idioma === language)['base'];

  useEffect(() => {
    const hash = location.pathname.replace('/', '#');
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        // Calcular la posición de desplazamiento restando 72px
        const scrollPosition = targetElement.offsetTop - 72;
        // Realizar el scroll suave hacia la posición calculada
        window.scroll({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [location]);
  return (
    <div className="container-page">
      {/* Sección de presentación */}
      <div id={menuBase[0].link.replace('/', '')} className="sm:flex justify-center items-center h-auto relative p-4">
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
      <div id={menuBase[1].link.replace('/', '')} className="sm:flex sm:flex-col justify-center items-center relative p-4">
        {dataServicios['titulo'] && (
          <h1>{dataServicios['titulo']}</h1>
        )}
        <div className="max-sm:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataServicios['base'] && dataServicios['base'].map((service, index) => (
            <div key={index} className="background-secondary rounded-lg shadow p-4 text-center">
              <CustomSVG svgPath={service.image} fillColor={`${isDark ? 'white' : 'black'}`} />
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <div className="sm:hidden max-sm:block rounded my-4">
          <CustomCarousel>
            {dataServicios['base'] && dataServicios['base'].map((service, index) => (
              <div key={index} className="background-secondary rounded-lg shadow px-8 pt-4 pb-10 text-center">
                <CustomSVG svgPath={service.image} fillColor={`${isDark ? 'white' : 'black'}`} />
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
            ))}
          </CustomCarousel>
        </div>
      </div>
      {/* Sección de Por qué trabajar con nosotros */}
      <div id={menuBase[2].link.replace('/', '')} className="flex flex-col justify-center items-center relative p-4">
        {dataTrabajarConNosotros['titulo'] && (
          <h1>{dataTrabajarConNosotros['titulo']}</h1>
        )}
        <div className="sm:flex justify-center items-center relative mx-10">
          <div className="sm:w-2/4 max-sm:w-full grid grid-cols-1 gap-6">
            {dataTrabajarConNosotros['base'] && dataTrabajarConNosotros['base'].map((razones, index) => (
              <div key={index} className="background-secondary rounded-lg shadow p-4">
                <div className="flex"><h1 className="mr-2">{index + 1}</h1><h2 className="mt-2">{razones.title}</h2></div>
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
