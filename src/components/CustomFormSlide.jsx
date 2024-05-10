import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight  } from "react-icons/hi";
import { sizeIcons } from '../constants/constants';

export const CustomFormSlide = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="mx-auto relative">
            {/* Botones de navegación entre pasos */}
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

            {/* Renderizar el componente del paso actual */}
            {steps[currentStep]}
        </div>
    );
};
