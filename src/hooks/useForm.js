import { useEffect, useMemo, useRef, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});
  const [isValidEmail, setIsValidEmail] = useState(true);
  const fileInputsRef = useRef({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = (event) => {
    console.log(event)
    const { name, type, files, value } = event.target || {};
    let newValue;

    if (type === 'file') {
      if (files.length > 0) {
        newValue = files.length === 1 ? [files[0]] : Array.from(files);
      } else {
        newValue = [];
      }
    } else {
      newValue = value;
    }

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: newValue,
    }));
  };

  const onInputBlur = (event) => { // Únicamente para validar emails
    const { name, type, value } = event.target;

    if(validateEmail(value)){
      setIsValidEmail(true);
    }
    else{
      setIsValidEmail(false);
    }  
  };

  const onResetForm = () => {
    setFormState(initialForm);
    // Restablecer inputs de tipo file
    for (const key of Object.keys(fileInputsRef.current)) {
      fileInputsRef.current[key].value = '';
    }
  };

  const updateInput = (name, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  const validateEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
  }

  return {
    ...formState,
    formState,
    setFormState,
    onInputChange,
    onInputBlur,
    onResetForm,
    updateInput,
    ...formValidation,
    isFormValid,
    fileInputsRef,
    isValidEmail,
  };
};
