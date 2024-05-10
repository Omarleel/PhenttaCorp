import { useEffect } from "react";
import { CustomCarousel } from "../../components";
import { CustomAnimatedText } from "../../components/CustomAnimatedText";
import { useLanguage } from "../../hooks";
import { acercaDe, equipoPhentta, preguntasFrecuentes } from "../../mocks/data"

export const AboutUsPage = () => {
  const { language } = useLanguage();
  const dataAcercaDe = acercaDe.find(acercaDe => acercaDe.idioma === language).base;
  const dataEquipo = equipoPhentta.find(equipo => equipo.idioma === language);
  const dataPreguntasFrecuentes = preguntasFrecuentes.find(preguntasFrecuentes => preguntasFrecuentes.idioma === language);
  
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, [])
  
  return (
    <div className="container-page">
      <div className="margin-aboutus text-justify">
        {/* Sección presentación */}
        <div>
          <div className="sm:flex items-center p-4">
            <div className="sm:w-2/4">
              <CustomAnimatedText
                plainText={dataAcercaDe[0].title}
                words={dataAcercaDe[0].words}
                className="items-center text-3xl lg:text-6xl font-bold mb-4 text-color-primary"
              />
            </div>
            <img className="sm:w-2/4" src="/assets/images/aboutus/presentation.png"></img>
          </div>
        </div>
        {/* Sección Acerca de */}
        <div className="py-4">
          <h1>{dataAcercaDe[1].title}</h1>
          <hr />
          <p>
            {dataAcercaDe[1].description}
          </p>
        </div>
        {/* Sección Visión/Misión */}
        <div className="background-secondary p-4">
          <div className="sm:flex items-center my-4">
            <div className="sm:w-3/4 md:mx-10 order-2">
              <h1>{dataAcercaDe[2].title}</h1>
              <p>{dataAcercaDe[2].description}</p>
            </div>
            <img src="/assets/images/aboutus/vision.png" className="w-full order-1 sm:w-1/4"></img>
          </div>
          <div className="sm:flex items-center my-4">
            <div className="sm:w-2/3 md:mx-10">
              <h1>{dataAcercaDe[3].title}</h1>
              <p> {dataAcercaDe[3].description}</p>
            </div>
            <img src="/assets/images/aboutus/mission.png" className="w-full sm:w-1/3"></img>
          </div>
        </div>
        {/* Sección Equipo */}
        <div className="py-4">
          <h1>Equipo de Phentta</h1>
          <hr />
          <div className="max-sm:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
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
            <CustomCarousel>
              {dataEquipo['base'] && dataEquipo['base'].map((equipo, index) => (
                <div key={index} className="background-secondary rounded-lg shadow px-8 pt-4 pb-10 text-center">
                  <img src={equipo.image} className="w-2/4 mx-auto" />
                  <h2>{equipo.name}</h2>
                  <p>{equipo.role}</p>
                </div>
              ))}
            </CustomCarousel>
          </div>
        </div>
        {/* Sección Preguntas frecuentes */}
        <div className="p-4 background-secondary">
          <h1>{dataPreguntasFrecuentes.titulo}</h1>
          <hr />
          <div className="flex flex-col">
            {
              dataPreguntasFrecuentes['base'] && dataPreguntasFrecuentes['base'].map((preguntasFrecuentes, index) => (
                <div key={index} className="my-2">
                  <h2 className="mt-3 mb-1">{index + 1}. {preguntasFrecuentes.title}</h2>
                  <p>{preguntasFrecuentes.description}</p>
                </div>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  )
}
