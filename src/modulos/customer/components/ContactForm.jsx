import React from 'react'
import { cargos, contactanosFormulario, mensajesAlerta } from '../../../mocks/data';
import { useConnection, useForm, useLanguage } from '../../../hooks';
import { countryCodes } from '../../../mocks/countryCodes';
import { useFormSlide } from '../../../hooks/useFormSlide';

const formFields = {
    nombres: '',
    apellidos: '',
    email: '',
    codigoPais: 'PE+51',
    celular: '',
    empresa: '',
    cargo: '',
    servicio: '',
}
export const ContactForm = () => {
    const { language } = useLanguage();
    const { isLoading } = useConnection();
    const { setData, resetFormSlide, getFormData } = useFormSlide();
    const {
        nombres,
        apellidos,
        email,
        codigoPais,
        celular,
        empresa,
        cargo,
        servicio,
        onInputChange,
        onInputBlur,
        onResetForm,
        updateInput,
        isValidEmail,
        formState,
    } = useForm(formFields)
    const dataContactanosFormulario = contactanosFormulario.find(contactanosFormulario => contactanosFormulario.idioma === language);
    const dataMensajesAlerta = mensajesAlerta.find(mensajeAlerta => mensajeAlerta.idioma === language);
    const dataCargos = cargos.find(cargo => cargo.idioma === language);
    
    const onSubmit = (event) => {
        event.preventDefault();
        console.log('Form enviado', formState);
        setData(formState);
        //resetFormSlide();
    }
    return (
        <div className={`background-secondary flex max-md:flex-col items-center justify-center min-h-screen`}>
            <div className="md:w-2/4 p-4 max-sm:hidden">
                <img src="/assets/images/contact/customerSupport.svg" />
            </div>
            <div className="md:w-2/4 text-center mx-4 md:mx-8 my-8">
                <h1>{dataContactanosFormulario.titulo}</h1>
                <h2>{dataContactanosFormulario.base[0].title}</h2>
                <p>{dataContactanosFormulario.base[0].description}</p>
                <div className="flex flex-col text-left mx-auto my-2 space-y-2 background-primary p-4 rounded-lg">
                    <form onSubmit={onSubmit}>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="nombres" className="primary-label">
                                    {dataContactanosFormulario.base[1].firstName}
                                </label>
                                <div className="flex">
                                    <input
                                        id="nombres"
                                        type="text"
                                        name="nombres"
                                        autoComplete="false"
                                        placeholder=""
                                        className="primary-input p-2 w-full"
                                        value={nombres}
                                        onChange={onInputChange}
                                        required
                                    />

                                </div>
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="apellidos" className="primary-label">
                                    {dataContactanosFormulario.base[1].lastName}
                                </label>
                                <div className="flex">
                                    <input
                                        id="apellidos"
                                        type="text"
                                        name="apellidos"
                                        autoComplete="false"
                                        placeholder=""
                                        className="primary-input p-2 w-full"
                                        value={apellidos}
                                        onChange={onInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="primary-label">
                                {dataContactanosFormulario.base[1].email}
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
                                {dataContactanosFormulario.base[1].phone}
                            </label>
                            <div className="flex space-x-2">
                            <select
                                id="codigoPais"
                                name="codigoPais"
                                className="primary-input p-2 min-w-24 w-2/5"
                                value={codigoPais}
                                onChange={onInputChange}
                                required
                            >
                                {
                                    countryCodes.map( (country, index) => (
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
                        { (getFormData && getFormData.tipoCliente === 'Empresa') && (
                            <>
                            <div>
                                <label htmlFor="empresa" className="primary-label">
                                    {dataContactanosFormulario.base[1].companyName}
                                </label>
                                <div>
                                    <input
                                        id="empresa"
                                        type="empresa"
                                        name="empresa"
                                        autoComplete="false"
                                        placeholder=""
                                        className="primary-input p-2 w-full"
                                        value={empresa}
                                        onChange={onInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                            <label htmlFor="cargo" className="primary-label">
                                    {dataContactanosFormulario.base[1].role}
                                </label>
                            <select
                                id="cargo"
                                name="cargo"
                                className="primary-input p-2 w-full"
                                value={cargo}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled>{dataMensajesAlerta.base[0].defaultSelect}</option>
                                {
                                    dataCargos && dataCargos.base.map((cargo) => (
                                        <option key={cargo} value={cargo}>
                                            {cargo}
                                        </option>
                                    ))}
                            </select>
                            </div>
                            </>
                            
                            
                        ) }
                        <div>
                            <label htmlFor="servicio" className="primary-label">
                                {dataContactanosFormulario.base[1].service}
                            </label>
                            <select
                                id="servicio"
                                name="servicio"
                                className="primary-input p-2 w-full"
                                value={servicio}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled>{dataMensajesAlerta.base[0].defaultSelect}</option>
                                {
                                    dataContactanosFormulario.base[1].services && dataContactanosFormulario.base[1].services.map((servicio) => (
                                        <option key={servicio} value={servicio}>
                                            {servicio}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="btn-primary sm:max-w-40 w-full mt-5 mx-auto"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Procesando...' : dataContactanosFormulario.base[1].button}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
