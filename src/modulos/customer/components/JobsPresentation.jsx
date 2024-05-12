import { useEffect } from "react";
import { useLanguage } from "../../../hooks";
import { useFormSlide } from "../../../hooks/useFormSlide";
import { empleos } from "../../../mocks/data";

export const JobsPresentation = () => {
    const { language } = useLanguage();
    const dataEmpleos = empleos.find(empleo => empleo.idioma === language);
    const {setFormCurrentStep: setCurrentStep, setData, getFormCurrentState: currentStep, resetFormSlide} = useFormSlide();

    useEffect(() => {
        resetFormSlide();
        console.log('rei')
    }, [])

    const handleOnclick = (tipoCliente) =>{
        setCurrentStep(currentStep+1);
        setData({tipoCliente: tipoCliente});
    }
    return (
        <div className="max-sm:flex-col sm:flex items-center text-cente">
            <div className="sm:w-2/4 order-2">
                <h1>{dataEmpleos.titulo}</h1>
                <button className="btn-primary" onClick={ ()=>handleOnclick('Postulante') }>Postular</button>
            </div>
            <img className="sm:w-2/4 px-4 order-1" src="/assets/images/jobs/jobs.svg"></img>
        </div>
    )
}
