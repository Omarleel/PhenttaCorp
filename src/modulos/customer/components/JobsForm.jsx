import React from 'react';
import { useEffect } from "react";
import { useForm, useLanguage } from '../../../hooks';
import { countryCodes } from '../../../mocks/countryCodes';
import { useFormSlide } from '../../../hooks/useFormSlide';
import { empleosFormulario, mensajesAlerta } from '../../../mocks/data';
import { HiInformationCircle } from "react-icons/hi";
import { CustomTooltip } from '../../../components/CustomTooltip';
import { Tooltip } from 'react-tooltip';

const formFields = {
  nombres: '',
  apellidos: '',
  email: '',
  codigoPais: 'PE+51',
  celular: '',
  curriculum: '',
  cartaPresentacion: '',
  experienciaLaboral: '',
};

export const JobsForm = () => {
  const { language } = useLanguage();
  const { setData, resetFormSlide, getFormData } = useFormSlide();
  const {
    nombres,
    apellidos,
    email,
    codigoPais,
    celular,
    curriculum,
    cartaPresentacion,
    experienciaLaboral,
    onInputChange,
    onInputBlur,
    isValidEmail,
    fileInputsRef,
    formState,
  } = useForm(formFields);
  const dataMensajesAlerta = mensajesAlerta.find(mensajeAlerta => mensajeAlerta.idioma === language);
  const dataEmpleosFormulario = empleosFormulario.find(empleo => empleo.idioma === language);
  useEffect(() => {
    resetFormSlide();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario de empleo enviado', formState);
    setData(formState);

  };

  return (
    <div className="background-secondary flex max-md:flex-col items-center justify-center min-h-screen">
      <div className="md:w-2/4 p-4 max-sm:hidden">
          <img src="/assets/images/jobs/recruitment.svg" />
      </div>
      <div className="md:w-2/4 text-center mx-4 md:mx-8 my-8">
        <h1>{dataEmpleosFormulario.base[1].title}</h1>
        <div className="flex flex-col text-left mx-auto my-2 space-y-2 background-primary p-4 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="nombres" className="primary-label">{dataEmpleosFormulario.base[2].firstName}</label>
                <input
                  id="nombres"
                  type="text"
                  name="nombres"
                  className="primary-input p-2 w-full"
                  value={nombres}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="apellidos" className="primary-label">{dataEmpleosFormulario.base[2].lastName}</label>
                <input
                  id="apellidos"
                  type="text"
                  name="apellidos"
                  className="primary-input p-2 w-full"
                  value={apellidos}
                  onChange={onInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="primary-label">
                {dataEmpleosFormulario.base[2].email}
              </label>
              <div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="false"
                  placeholder=""
                  className="primary-input p-2 w-full"
                  value={email}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  required
                />
                {!isValidEmail && (
                  <p className="text-red-500 text-sm mt-1">{dataMensajesAlerta.base[0].invalidEmail}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="codigoPais" className="primary-label">
                {dataEmpleosFormulario.base[2].phone}
              </label>
              <div className="flex space-x-2">
                <select
                  id="codigoPais"
                  name="codigoPais"
                  className="select-input p-2 min-w-24 w-2/5"
                  value={codigoPais}
                  onChange={onInputChange}
                  required
                >
                  {
                    countryCodes.map((country, index) => (
                      <option key={index} value={`${country.code}${country.dial_code}`}>
                        {country.name} ({country.dial_code})
                      </option>
                    ))}
                </select>
                <input
                  id="celular"
                  type="tel"
                  name="celular"
                  autoComplete="false"
                  placeholder=""
                  className="primary-input p-2 w-full"
                  value={celular}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div>
            <label htmlFor="curriculumVitae" className="primary-label">
                  <div className="flex items-center space-x-2">
                      <span>{dataEmpleosFormulario.base[2].curriculum}</span>
                      <CustomTooltip
                          tooltipId={1}
                          visibleText={<HiInformationCircle />}
                          tooltipText={dataMensajesAlerta.base[0].cvSupportedFilyTypes}
                      />
                  </div>
              </label>
            
              <input
                id="curriculumVitae"
                type="file"
                ref={inputRef => fileInputsRef.current.curriculum = inputRef}
                accept=".docx,.doc,.pdf"
                name="curriculumVitae"
                className="primary-input p-2 w-full"
                onChange={onInputChange}
                required
              />
            </div>
            <div>
            <label htmlFor="cartaPresentacion" className="primary-label">
                  <div className="flex items-center space-x-2">
                      <span>{dataEmpleosFormulario.base[2].letter}</span>
                      <CustomTooltip
                          tooltipId={1}
                          visibleText={<HiInformationCircle />}
                          tooltipText={dataMensajesAlerta.base[0].cvSupportedFilyTypes}
                      />
                  </div>
              </label>
              <input
                id="cartaPresentacion"
                type="file"
                ref={inputRef => fileInputsRef.current.cartaPresentacion = inputRef}
                accept=".docx,.doc,.pdf"
                name="cartaPresentacion"
                className="primary-input p-2 w-full"
                onChange={onInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="experienciaLaboral" className="primary-label">{dataEmpleosFormulario.base[2].experience}</label>
              <input
                id="experienciaLaboral"
                type="number"
                name="experienciaLaboral"
                className="primary-input p-2 w-full"
                value={experienciaLaboral}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn-primary w-full mt-5">
                {dataEmpleosFormulario.base[2].button}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
