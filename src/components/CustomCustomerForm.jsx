import { useEffect } from "react";
import { useConnection } from "../hooks/useConnection";
import { useForm } from "../hooks/useForm";
import { isDNI } from "../utilities/utils";
import { HiIdentification } from "react-icons/hi";
import { useModal } from "../hooks/useModal";
import { useTable } from "../hooks";

const initialFormFields = {
    id: '',
    dni: '',
    nombre: '',
    apellidos: '',
    email: '',
    celular: '',
    fechaNacimiento: '',
}
let formFields = initialFormFields;
export const CustomCustomerForm = ({ buttonTitle = 'Registrar' }) => {
    const { isLoading } = useConnection();
    const { getFormId, getFormAction } = useModal();
    const { editCustomTable, getTableById } = useTable()
    const dataClientes = getTableById('tabla-clientes');

    const getDataCliente = (id) => dataClientes.find(cliente => cliente.id === id);

    useEffect(() => {
        if ( getFormAction === 'Editar') {
            formFields = getDataCliente(getFormId);
        }
        else{
            formFields = initialFormFields;
        }
    }, [getFormAction]);

    const {
        dni,
        nombre,
        apellidos,
        email,
        celular,
        fechaNacimiento,
        onInputChange: onCustomerFormInputChange,
        onResetForm: onCustomerFormResetForm,
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
        const dataClientesActualizado = dataClientes.map(tabla => {
            if (tabla.id === getFormId) {
                return formState;
            }
            return tabla;
        });
        editCustomTable('tabla-clientes', dataClientesActualizado);
    }
    return (
        <form onSubmit={onSubmit}>
            <h2>Datos del cliente</h2>
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
                            onChange={onCustomerFormInputChange}
                            onInput={handleConsultarPersona}
                            required
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
                            onChange={onCustomerFormInputChange}
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
                            onChange={onCustomerFormInputChange}
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
                            onChange={onCustomerFormInputChange}
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
                            onChange={onCustomerFormInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <label htmlFor="email" className="primary-label">
                        Email
                    </label>
                    <div className="flex">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="false"
                            placeholder=""
                            className="primary-input p-2 w-full w-full"
                            value={email}
                            onChange={onCustomerFormInputChange}
                            required
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
