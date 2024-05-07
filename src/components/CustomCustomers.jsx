import React, { useEffect, useState } from 'react'
import { CustomModal, CustomTable } from '.'
import { formatearFechas } from '../utilities/utils';
import { dataClientes } from '../mocks/data';
import { HiOutlinePlus } from "react-icons/hi";
import { CustomCustomerForm } from './CustomCustomerForm';
import { useOrder } from '../hooks/useOrder';

export const CustomCustomers = () => {
    const [ clientes, setClientes ] = useState([]);
    const { setCustomer, getCustomerId } = useOrder();
    useEffect(() => {
        const dataClientesFormateado = formatearFechas({ data: dataClientes, clave: ['fechaUltimaOrden'], formato: 'dd/MM/yyyy' });
        setClientes(dataClientesFormateado)
    }, []);
    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'nombre',
            header: 'Nombre',
        },
        {
            accessorKey: 'apellidos',
            header: 'Apellidos',
        },
        {
            accessorKey: 'fechaUltimaOrden',
            header: 'Última orden',
        },
    ];
    const handleActions = {
        EliminarItem: (id) => {
            console.log(`Eliminaste el id: ${id}`);
            return true;
        }
    };
    const onClickItem = (item) => {
        setCustomer(item.id);
    }
    return (
        <div className="w-full">
            <div className="max-lg:block flex justify-between items-center mx-4 my-2">
                <h2 className="text-lg font-bold mb-0">Clientes</h2>
                <div className="relative">
                    <CustomModal
                        id='1'
                        buttonTitle={<div className="flex items-center">Agregar <HiOutlinePlus className="ml-2"/></div>}
                        modalTitle='Agregar'
                        modalContent={<CustomCustomerForm />}
                        lockedBackground={true}
                    />
                </div>
            </div>
            <div>
                <CustomTable
                    id="tabla-clientes"
                    data={clientes}
                    columns={columns}
                    rowFilled={true}
                    actionsColumn={true}
                    handleActions={handleActions}
                    editForm={<CustomCustomerForm buttonTitle='Guardar cambios'/>}
                    onClickItem={onClickItem}
                />
            </div>
        </div>
    )
}
