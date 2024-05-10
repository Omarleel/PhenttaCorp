import { CustomSVG } from "../../components"

export const ContactUsPage = () => {
  return (
    <div className="container-page">
      <div className="background-secondary flex max-md:flex-col items-center h-screen">
        <div className="md:w-2/4 max-sm:hidden">
          <img src="/assets/images/contact/presentation.svg"/>
        </div>
        <div className="md:w-2/4 text-center m-12 my-auto ">
          <h1>Hola</h1>
          <h2>Por favor, ayúdanos a entender mejor tu perfil como cliente. </h2>
          <p>Selecciona si representas a una empresa o eres un cliente particular haciendo clic en una de las opciones a continuación. </p>
          <div className="flex flex-col w-2/4 max-w-80 mx-auto my-2 space-y-2">
            <button className="btn-primary">Soy una empresa</button>
            <button className="btn-primary-outline">Cliente particular</button>
          </div>
        </div>
      </div>
    </div>
  )
}