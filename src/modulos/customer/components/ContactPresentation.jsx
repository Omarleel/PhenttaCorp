import { useEffect } from "react";
import { useLanguage } from "../../../hooks";
import { useFormSlide } from "../../../hooks/useFormSlide";
import { contactanos } from "../../../mocks/data";

export const ContactPresentation = () => {
    const { language } = useLanguage();
    const {setFormCurrentStep: setCurrentStep, setData, getFormCurrentStep: currentStep, resetFormSlide} = useFormSlide();
    const dataContactanos = contactanos.find(contactanos => contactanos.idioma === language);
    
    useEffect(() => {
        resetFormSlide();
    }, [])

    const handleOnclick = (tipoCliente) =>{
        setCurrentStep(currentStep+1);
        setData({tipoCliente: tipoCliente});
    }
    
    return (
        <div className={`background-tertiary flex max-md:flex-col items-center justify-center min-h-screen`}>
            <div className="md:w-2/4 p-4 max-sm:hidden">
                <img src="/assets/images/contact/presentation.svg" />
            </div>
            <div className="md:w-2/4 text-center mx-4 md:mx-8 my-8 md:my-auto">
                <h1>{dataContactanos.titulo}</h1>
                <h2>{dataContactanos.base[0].title}</h2>
                <p>{dataContactanos.base[0].description}</p>
                <div className="flex flex-col w-2/4 max-w-80 mx-auto my-2 space-y-2">
                    <button onClick={() => handleOnclick('Empresa') } className="btn-primary">{dataContactanos.base[1].btnPrimary}</button>
                    <button onClick={() => handleOnclick('Persona') } className="btn-primary-outline">{dataContactanos.base[1].btnSecondary}</button>
                </div>
            </div>
        </div>
    )
}
