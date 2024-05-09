import { CustomCarousel } from "../../components";
import { CustomAnimatedText } from "../../components/CustomAnimatedText";
import { useLanguage } from "../../hooks";
import { equipoPhentta } from "../../mocks/data"

export const AboutUsPage = () => {
  const { language } = useLanguage();
  const words = ['tecnología', 'innovación', 'excelencia', 'crecimiento empresarial', 'soluciones digitales'];
  const dataEquipo = equipoPhentta.find(equipo => equipo.idioma === language);
  return (
    <div className="container-page">
      
      <div className="margin-aboutus">
        <div>
          <div className="sm:flex items-center">
          <div className="sm:w-2/4">
          <CustomAnimatedText 
          plainText="Phentta es"
          words={words}
          className="text-3xl lg:text-6xl font-bold mb-4 text-color-primary"
          />
          </div>
            <img className="sm:w-2/4" src="/assets/images/aboutus/presentation.png"></img>
          </div>
        </div>
        {/* Sección Acerca de */}
        <div>          
          <h1>Acerca de Phentta</h1>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate orci ac nulla gravida, sit amet sollicitudin ligula mollis. Maecenas metus purus, porttitor non posuere in, aliquet ut tellus. Aliquam viverra malesuada diam, vitae malesuada libero fermentum in. Vivamus semper ligula id leo maximus interdum. Duis urna diam, suscipit eget vehicula ut, tempus ut magna. Vivamus id velit eu sem gravida maximus ut eget felis. Nunc rutrum nibh consectetur, hendrerit ante a, condimentum tortor. Nunc at ullamcorper turpis. Aenean id nulla sed est aliquet sodales. Duis maximus velit ac odio rhoncus, sit amet tempor sapien consequat. Donec lobortis rhoncus justo quis pulvinar.
          </p>
        </div>
        {/* Sección Visión/Misión */}
        <div>
          <div className="sm:flex items-center my-4">
            <div className="sm:w-3/4 md:mx-10 order-2">
              <h1>Visión</h1>
              <p>Nos esforzamos por convertirnos en la empresa líder en tecnología a nivel mundial, abarcando diversos sectores y siendo reconocidos por nuestra innovación, calidad y compromiso con la excelencia. Estamos comprometidos a comenzar este camino con nuestro enfoque actual y expandirnos hacia nuevas fronteras en el futuro</p>
            </div>
            <img src="/assets/images/aboutus/vision.png" className="w-full order-1 sm:w-1/4"></img>
          </div>
          <div className="sm:flex items-center my-4">
            <div className="sm:w-2/3 md:mx-10">
              <h1>Misión</h1>
              <p>En Phentta, nos dedicamos a proporcionar soluciones tecnológicas innovadoras y de alta calidad para impulsar el éxito de nuestros clientes. Nos esforzamos por ofrecer servicios personalizados y orientados a resultados, brindando atención excepcional a cada cliente y adaptándonos constantemente a las necesidades del mercado en evolución.</p>
            </div>
            <img src="/assets/images/aboutus/mission.png" className="w-full sm:w-1/3"></img>
          </div>
        </div>
        {/* Sección Equipo */}
        <div>
        <h1>Equipo de Phentta</h1>
        <hr/>
          <div className="max-sm:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {dataEquipo['base'] && dataEquipo['base'].map((equipo, index) => (
            <div key={index} className={`background-secondary rounded-lg shadow p-4 text-center 
            ${( ((index+1) === (dataEquipo['base'].length)) && (index) % 3 == 0 ) && 'lg:col-start-2'}`}>
              <img src={equipo.image}/>
              <h2>{equipo.name}</h2>
              <p>{equipo.role}</p>
            </div>
          ))}
          </div>
          <div className="sm:hidden max-sm:block rounded my-4">
          <CustomCarousel>
            {dataEquipo['base'] && dataEquipo['base'].map((equipo, index) => (
              <div key={index} className="background-secondary rounded-lg shadow px-8 pt-4 pb-10 text-center">
                <img src={equipo.image}/>
                <h2>{equipo.name}</h2>
                <p>{equipo.role}</p>
              </div>
            ))}
          </CustomCarousel>
        </div>
        </div>
      </div>
    </div>
  )
}
