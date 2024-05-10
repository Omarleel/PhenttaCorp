import { HiChevronLeft, HiChevronRight  } from "react-icons/hi";
import { sizeIcons } from '../constants/constants';
import { useFormSlide } from '../hooks/useFormSlide';
import { useEffect } from "react";

export const CustomFormSlide = ({ steps }) => {
    const {setFormCurrentStep: setCurrentStep, getFormCurrentState: currentStep, getFormData} = useFormSlide();
    
    useEffect(() => {
        setCurrentStep(0);
    }, [])
    
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    return (
        <div className="mx-auto relative">
            {/* Botones de navegación entre pasos */}
            { (getFormData && Object.keys(getFormData).length > 0) && (
                <div className="flex justify-between mt-4 absolute w-full">
                {currentStep > 0 && (
                    <button className="p-4 absolute left-0" onClick={prevStep}>
                        <HiChevronLeft size={sizeIcons} />
                    </button>
                )}
                {currentStep < steps.length - 1 && (
                    <button className="p-4 absolute right-0" onClick={nextStep}>
                        <HiChevronRight size={sizeIcons} />
                    </button>
                )}
            </div>
            )}
            

            {/* Renderizar el componente del paso actual */}
            {steps[currentStep]}
        </div>
    );
};
