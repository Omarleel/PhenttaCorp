import { useEffect } from "react";
import { CustomImageCarousel, CustomSection } from "../../components";
import { CustomAnimatedText } from "../../components/CustomAnimatedText";
import { useLanguage } from "../../hooks";
import { acercaDe, equipoPhentta, preguntasFrecuentes, rutas } from "../../mocks/data"
import { NavLink } from "react-router-dom";

export const AboutUsPage = () => {
  const { language } = useLanguage();
  const dataAcercaDe = acercaDe.find(acercaDe => acercaDe.idioma === language).base;
  const dataEquipo = equipoPhentta.find(equipo => equipo.idioma === language);
  const dataPreguntasFrecuentes = preguntasFrecuentes.find(preguntasFrecuentes => preguntasFrecuentes.idioma === language);
  const menu = rutas.find(menu => menu.idioma === language);
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, [])

  return (
    <div className="container-page">
      <div className="background-tertiary p-8 md:mx-20 text-justify">
        {/* Sección presentación */}
        <div>
          <div className="sm:flex items-center py-4">
            <div className="sm:w-2/4">
              <CustomAnimatedText
                plainText={dataAcercaDe[0].title}
                words={dataAcercaDe[0].words}
                className="items-center text-3xl lg:text-6xl font-bold mb-4 text-color-primary"
              />
            </div>
            <img className="sm:w-2/4" src="/assets/images/aboutus/presentation.svg"></img>
          </div>
        </div>
        {/* Sección Acerca de */}
        <div className="py-4">
          <h1>{dataAcercaDe[1].title}</h1>
          <hr />
          <p className="mt-4">
            {dataAcercaDe[1].description}
          </p>
        </div>
        {/* Sección Visión/Misión */}
        <CustomSection>
          <div className="sm:flex items-center my-4">
            <div className="sm:w-3/4 md:mx-10 order-2">
              <h1>{dataAcercaDe[2].title}</h1>
              <p>{dataAcercaDe[2].description}</p>
            </div>
            <img src="/assets/images/aboutus/vision.svg" className="w-full order-1 sm:w-1/4"></img>
          </div>
          <div className="sm:flex items-center my-4">
            <div className="sm:w-2/3 md:mx-10">
              <h1>{dataAcercaDe[3].title}</h1>
              <p> {dataAcercaDe[3].description}</p>
            </div>
            <img src="/assets/images/aboutus/mission.svg" className="w-full sm:w-1/4"></img>
          </div>
        </CustomSection>
        {/* Sección Equipo */}
        <div className="py-4">
          <h1>Equipo de Phentta</h1>
          <hr />
          <div className="max-sm:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {dataEquipo['base'] && dataEquipo['base'].map((equipo, index) => (
              <div key={index} className={`background-secondary rounded-lg shadow p-4 text-center 
              ${(((index + 1) === (dataEquipo['base'].length)) && (index) % 3 == 0) && 'lg:col-start-2'}`}>
                <img src={equipo.image} className="w-2/4 mx-auto my-2" />
                <h2>{equipo.name}</h2>
                <p>{equipo.role}</p>
              </div>
            ))}
          </div>
          <div className="sm:hidden max-sm:block rounded my-4">
            < CustomImageCarousel interval={3000}>
              {dataEquipo['base'] && dataEquipo['base'].map((equipo, index) => (
                <div key={index} className="background-secondary rounded-lg shadow px-8 mt-4 pb-10 text-center">
                  <img src={equipo.image} className="w-2/4 mx-auto" />
                  <h2>{equipo.name}</h2>
                  <p>{equipo.role}</p>
                </div>
              ))}
            </ CustomImageCarousel>
          </div>
        </div>
        {/* Sección Preguntas frecuentes */}
        <CustomSection>
          <h1>{dataPreguntasFrecuentes.titulo}</h1>
          <hr />
          <div className="flex flex-col">
            {
              dataPreguntasFrecuentes['base'] && dataPreguntasFrecuentes['base'].map((preguntasFrecuentes, index) => (
                <div key={index} className="my-2">
                  <h2 className="mt-4 mb-1">{index + 1}. {preguntasFrecuentes.title}</h2>
                  <p>

                    {index !== 3 ? (
                      preguntasFrecuentes.description
                    ) : (

                      <>
                        {preguntasFrecuentes.description[0]}<NavLink to={menu.base[4].link} className='text-color-hover dark:text-color-hover-dark hover:underline'>{preguntasFrecuentes.description[1]}</NavLink>
                      </>
                    )}
                  </p>
                </div>

              ))
            }
          </div>
        </CustomSection>
      </div>
    </div>
  )
}
