import React from 'react';
import { useEffect } from "react";
import { useForm, useLanguage} from '../../../hooks';
import { countryCodes } from '../../../mocks/countryCodes';
import { useFormSlide } from '../../../hooks/useFormSlide';
import { empleosDisponibles, mensajesAlerta } from '../../../mocks/data';

const formFields = {
    nombres: '',
    apellidos: '',
    email: '',
    codigoPais: 'PE+51',
    celular: '',
    empresa: '',
    cargo: '',
    experienciaLaboral: '',
    disponibilidad: '',
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
        empresa,
        cargo,
        experienciaLaboral,
        disponibilidad,
        onInputChange,
        formState,
    } = useForm(formFields);
    const dataMensajesAlerta = mensajesAlerta.find(mensajeAlerta => mensajeAlerta.idioma === language);
    useEffect(() => {
        resetFormSlide();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Formulario de empleo enviado', formState);
        setData(formState);
        // Aquí puedes agregar lógica adicional para enviar los datos del formulario
    };

    const dataEmpleosDisponibles = empleosDisponibles.find((empleoDisponible) => empleoDisponible.idioma === language);

    return (
        <div className="max-sm:flex-col sm:flex items-center justify-center min-h-screen">
            <div className="sm:w-2/4 order-2">
                <h1>Formulario de Empleo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="nombres" className="primary-label">Nombres</label>
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
                            <label htmlFor="apellidos" className="primary-label">Apellidos</label>
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
                        <label htmlFor="email" className="primary-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="primary-input p-2 w-full"
                            value={email}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="flex space-x-2">
                        <select
                            id="codigoPais"
                            name="codigoPais"
                            className="primary-input p-2 min-w-24 w-2/5"
                            value={codigoPais}
                            onChange={onInputChange}
                            required
                        >
                            {countryCodes.map((country, index) => (
                                <option key={index} value={`${country.code}${country.dial_code}`}>
                                    {country.name} ({country.dial_code})
                                </option>
                            ))}
                        </select>
                        <input
                            id="celular"
                            type="tel"
                            name="celular"
                            className="primary-input p-2 w-full"
                            value={celular}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="empresa" className="primary-label">Empresa</label>
                        <input
                            id="empresa"
                            type="text"
                            name="empresa"
                            className="primary-input p-2 w-full"
                            value={empresa}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cargo" className="primary-label">Cargo</label>
                        <select
                            id="cargo"
                            name="cargo"
                            className="primary-input p-2 w-full"
                            value={cargo}
                            onChange={onInputChange}
                            required
                        >
                            <option value="" disabled>{dataMensajesAlerta.base[0].defaultSelect}</option>
                            {dataEmpleosDisponibles && dataEmpleosDisponibles.base.map((empleo) => (
                                <option key={empleo} value={empleo}>
                                    {empleo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="experienciaLaboral" className="primary-label">Experiencia Laboral</label>
                        <textarea
                            id="experienciaLaboral"
                            name="experienciaLaboral"
                            className="primary-input p-2 w-full"
                            value={experienciaLaboral}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="disponibilidad" className="primary-label">Disponibilidad</label>
                        <textarea
                            id="disponibilidad"
                            name="disponibilidad"
                            className="primary-input p-2 w-full"
                            value={disponibilidad}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="btn-primary w-full mt-5">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
