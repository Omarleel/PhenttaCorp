import { useEffect } from "react";
import { useLanguage } from "../../../hooks";
import { useFormSlide } from "../../../hooks/useFormSlide";
import { empleosFormulario } from "../../../mocks/data";

export const JobsPresentation = () => {
    const { language } = useLanguage();
    const dataEmpleosFormulario = empleosFormulario.find(empleo => empleo.idioma === language);
    const { setFormCurrentStep: setCurrentStep, setData, getFormCurrentState: currentStep, resetFormSlide } = useFormSlide();

    useEffect(() => {
        resetFormSlide();
    }, []);

    const handleOnclick = (tipoCliente) => {
        setCurrentStep(currentStep + 1);
        setData({ tipoCliente: tipoCliente });
    };
    return (
        <div className="max-md:flex-col max-md:py-4 sm:flex items-center px-4 md:px-8">
            <div className="sm:w-2/4 order-2">
                <h1>{dataEmpleosFormulario.titulo}</h1>
                {/* Botón para postular visible en dispositivos pequeños */}
                <button className="btn-primary max-sm:hidden w-2/5" onClick={() => handleOnclick('Postulante')}>{dataEmpleosFormulario.boton}</button>
            </div>
            <div className="sm:w-2/4 order-1 relative">
                {/* Imagen con contenedor relativo */}
                <img className="px-4" src="/assets/images/jobs/jobs.svg" alt="Jobs" />
                {/* Botón para postular posicionado en el lado derecho inferior */}
                <button
                    className="btn-primary w-2/5 sm:hidden absolute bottom-4 right-4 sm:bottom-8 sm:right-8"
                    onClick={() => handleOnclick('Postulante')}
                >
                    {dataEmpleosFormulario.boton}
                </button>
            </div>
        </div>
    );
};
