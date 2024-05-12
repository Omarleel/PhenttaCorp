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
                    <button className="p-4 absolute left-0 hover-text" onClick={prevStep}>
                        <HiChevronLeft size={sizeIcons} />
                    </button>
                )}
                {currentStep < steps.length - 1 && (
                    <button className="p-4 absolute right-0 hover-text" onClick={nextStep}>
                        <HiChevronRight size={sizeIcons} />
                    </button>
                )}
            </div>
            )}
            <div className="flex">
            {steps.map((forms, index) => (
                <div key={index} className={`transition-all duration-300 ${currentStep === index ? 'visible w-full' : 'invisible w-0 h-0'}`}>
                    { forms }
                </div>
            ))}
            </div>
            {/* {steps[currentStep]} */}
          
        </div>
    );
};
