import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { sizeIcons } from '../constants/constants';
import { useFormSlide } from '../hooks/useFormSlide';
import { useEffect } from "react";

export const CustomFormSlide = ({ steps }) => {
  const {
    setFormCurrentStep: setCurrentStep,
    getFormCurrentState: currentStep,
    getFormData
  } = useFormSlide();

  useEffect(() => {
    setCurrentStep(0);
  }, []);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="mx-auto relative">
      {/* Botones de navegación entre pasos */}
      {getFormData && Object.keys(getFormData).length > 0 && (
        <div className="flex justify-between mt-4 absolute w-full">
          {currentStep > 0 && (
            <button
              className="p-4 absolute z-30 left-0 hover-text"
              onClick={prevStep}
            >
              <HiChevronLeft size={sizeIcons} />
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              className="p-4 absolute z-30 right-0 hover-text"
              onClick={nextStep}
            >
              <HiChevronRight size={sizeIcons} />
            </button>
          )}
        </div>
      )}
      {/* Contenedor de transición para los formularios */}
      <div className="flex overflow-hidden">
        {steps.map((form, index) => (
          <div
            key={index}
            className={`transform transition-transform duration-300 ${
              currentStep === index ? 'translate-x-0 w-full visile z-20' : 'translate-x-full w-0 h-0 invisible z-10'
            }`}
          >
            {form}
          </div>
        ))}
      </div>
    </div>
  );
};
