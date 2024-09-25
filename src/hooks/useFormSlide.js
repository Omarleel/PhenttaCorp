import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setCurrentStep, resetFormSlideState } from '../store';

export const useFormSlide = () => {
  const dispatch = useDispatch();

  const setFormCurrentStep = (index) => {
    dispatch(setCurrentStep(index));
  };

  const setData = (index) => {
    dispatch(setFormData(index));
  };

  const resetFormSlide = () => {
    dispatch(resetFormSlideState());
  };

  const getFormCurrentStep = useSelector((state) => state.formSlide.currentStep);
  const getFormData = useSelector((state) => state.formSlide.formData);

  return {
    setFormCurrentStep, setData,
    getFormCurrentStep, getFormData,
    resetFormSlide,
  };
};
