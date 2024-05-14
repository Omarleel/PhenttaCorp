import { useLanguage } from "../../../hooks";
import { empleosFormulario } from "../../../mocks/data";

export const JobsAvailable = () => {
    const { language } = useLanguage();
    const dataEmpleosFormulario = empleosFormulario.find(empleo => empleo.idioma === language);
    return (
        <div className="background-secondary flex max-md:flex-col items-center justify-center min-h-screen">

            <div className="md:w-2/4 text-center mx-4 md:mx-8 my-8 md:order-2">
                <h1>
                    { dataEmpleosFormulario.base[0].title }
                </h1>
                <h2>
                { dataEmpleosFormulario.base[0].description }
                </h2>
            </div>
            <div className="w-3/12 p-4 md:order-1">
                <img src="/assets/images/jobs/jobLess.svg" />
            </div>

        </div>
    )
}
