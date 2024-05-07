import { useEffect } from "react";
import { useConnection } from "../hooks/useConnection";
import { useForm } from "../hooks/useForm";
import { isDNI } from "../utilities/utils";
import { HiIdentification } from "react-icons/hi";
import { useAuthStore } from "../hooks/useAuthStore";
import { useModal } from "../hooks/useModal";

const initialFormFields = {
    dni: '',
    nombre: '',
    apellidos: '',
    correo: '',
    celular: '',
    fechaNacimiento: '',
    direccion: '',
    ciudad: '',
}
let formFields = initialFormFields;
export const CustomEmployeeForm = ({ buttonTitle = 'Registrar'}) => {
    const { isLoading } = useConnection();
    const { getFormAction } = useModal();
    const { user } = useAuthStore();
    const getDataEmpleado = (id) => {
        return {
            dni: '71667378',
            nombre: 'Omar',
            apellidos: 'Flores',
            correo: 'omar@gmail.com',
            celular: '987654321',
            fechaNacimiento: '2000-03-07',
            direccion: 'Street 13',
            ciudad: 'Lima',
        }
    }
    useEffect(() => {
        if ( getFormAction === 'Editar') {
            formFields = getDataEmpleado(user);
        }
        else{
            formFields = initialFormFields;
        }
    }, [getFormAction]);

    const {
        dni,
        nombre,
        apellidos,
        correo,
        celular,
        fechaNacimiento,
        direccion,
        ciudad,
        onInputChange: onEmployeeFormInputChange,
        onResetForm: onEmployeeFormResetForm,
        updateInput,
        formState,
    } = useForm(formFields);

    const handleConsultarPersona = async (event) => {
        const dni = event.target.value
        if (isDNI(dni)) {
            console.log('DNI valido')
            // const response = await getPersona(dni);

            // if (response.success === true) {
            //     const { nombres, apellidoPaterno, apellidoMaterno } = response.data.persona;
            //     updateInput('nombre', nombres);
            //     updateInput('apellidos', `${apellidoPaterno} ${apellidoMaterno}`);
            // }
        }
    }
    const onSubmit = (event) => {
        event.preventDefault();
        console.log('Form enviado', formState);
    }
    return (
        <form onSubmit={onSubmit}>
            <h2>Datos del empleado</h2>
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label htmlFor="dni" className="primary-label">
                        DNI
                    </label>
                    <div className="relative">
                        <input
                            id="dni"
                            type="number"
                            name="dni"
                            autoComplete="false"
                            placeholder=""
                            className="primary-input w-full pl-10"
                            value={dni}
                            onChange={onEmployeeFormInputChange}
                            onInput={handleConsultarPersona}
                            required
                            disabled={getFormAction === 'Editar' ? true : false}
                        />
                        <HiIdentification className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>
                <div className="w-1/2">
                    <label htmlFor="fechaNacimiento" className="primary-label">
                        Fecha de nacimiento
                    </label>
                    <div className="flex">
                        <input
                            id="fechaNacimiento"
                            type="date"
                            name="fechaNacimiento"
                            autoComplete="false"
                            placeholder=""
                            className="primary-input p-2 w-full"
                            value={fechaNacimiento}
                            onChange={onEmployeeFormInputChange}
                            onInput={handleConsultarPersona}
                            required
                        />
                    </div>
                </div>

            </div>
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label htmlFor="nombre" className="primary-label">
                        Nombre
                    </label>
                    <div className="flex">
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            autoComplete="false"
                            placeholder=""
                            className="primary-input p-2 w-full"
                            value={nombre}
                            onChange={onEmployeeFormInputChange}
                            disabled={getFormAction === 'Editar' ? true : false}
                        />

                    </div>
                </div>
                <div className="w-1/2">
                    <label htmlFor="apellidos" className="primary-label">
                        Apellidos
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
                            onChange={onEmployeeFormInputChange}
                            disabled={getFormAction === 'Editar' ? true : false}
                        />
                    </div>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label htmlFor="celular" className="primary-label">
                        Celular
                    </label>
                    <div className="flex">
                        <input
                            id="celular"
                            type="tel"
                            name="celular"
                            autoComplete="false"
                            placeholder=""
                            className="primary-input p-2 w-full w-full"
                            value={celular}
                            onChange={onEmployeeFormInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <label htmlFor="correo" className="primary-label">
                        Email
                    </label>
                    <div className="flex">
                        <input
                            id="correo"
                            type="email"
                            name="correo"
                            autoComplete="false"
                            placeholder=""
                            className="primary-input p-2 w-full w-full"
                            value={correo}
                            onChange={onEmployeeFormInputChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label htmlFor="direccion" className="primary-label">
                        Dirección
                    </label>
                    <div className="flex">
                        <input
                            id="direccion"
                            type="text"
                            name="direccion"
                            autoComplete="false"
                            placeholder=""
                            className="primary-input p-2 w-full"
                            value={direccion}
                            onChange={onEmployeeFormInputChange}
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <label htmlFor="ciudad" className="primary-label">
                        Ciudad
                    </label>
                    <div className="flex">
                        <input
                            id="ciudad"
                            type="text"
                            name="ciudad"
                            autoComplete="false"
                            placeholder=""
                            className="primary-input p-2 w-full"
                            value={ciudad}
                            onChange={onEmployeeFormInputChange}
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="btn-primary mt-5"
                disabled={isLoading}
            >
                {isLoading ? 'Procesando...' : buttonTitle}
            </button>
        </form>
    )
}
