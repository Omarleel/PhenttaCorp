import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { HiSearch, HiOutlineChevronUp, HiOutlineChevronDown, HiPencilAlt, HiOutlineTrash} from "react-icons/hi";
import { useModal, } from '../hooks/useModal';
import Swal from 'sweetalert2';
import { CustomLoading, CustomModal } from './';
import { customClass } from '../constants/colors';
import { useTable } from '../hooks';

export const CustomTable = (
    {
        id,
        title = null,
        data,
        dynamicData = { fetchData: null },
        columns = [],
        rowFilled = false,
        defaultItemsPerPage = null,
        actionsColumn, handleActions = {},
        onlyEdit = false,
        onClickItem = null,
        editForm,
    }
) => {
    const { handleModal } = useModal();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage ?? 10);
    const [totalPages, setTotalPages] = useState(1);
    const { removeRowCustomTable, editCustomTable, getTableById, removeCustomTable } = useTable(id, []);
    const [loadingData, setLoadingData] = useState(true);
    const [sortBy, setSortBy] = useState({ column: null, ascending: true });

    const handleDeleteItem = (rowId, rowIndex) => {
        try {
            if (handleActions && typeof handleActions.EliminarItem === 'function') {
                if( handleActions.EliminarItem(rowId) ) {
                    removeRowCustomTable(id, rowIndex);
                    handleModal();
                }
            } else {
                throw new Error('handleActions o EliminarItem no están definidos.');
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                customClass: customClass,
            });
        }
    };
    const indexOfLastItem = dynamicData.fetchData !== null ? itemsPerPage : currentPage * itemsPerPage;
    const indexOfFirstItem = dynamicData.fetchData !== null ? 0 : indexOfLastItem - itemsPerPage;
    const fetchDataAsync = async () => {
        try {
            setLoadingData(true);
            const { responseData, totalPages } = await dynamicData.fetchData(itemsPerPage, currentPage);
            setTotalPages(totalPages);
            editCustomTable(id, responseData);
            setLoadingData(false);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                customClass: customClass,
            });
        }
    };
    if (dynamicData.fetchData !== null) {
        useEffect(() => {
            fetchDataAsync();
            return () => {
                removeCustomTable(id);
            }
        }, [itemsPerPage, currentPage, getTableById(id)]);
    }
    else {
        useEffect(() => {
            setTotalPages(Math.ceil(data.length / itemsPerPage));
            editCustomTable(id, data);
            setLoadingData(false);
        }, [data]);
        useEffect(() => {
            if(getTableById(id).length > 0){
                setTotalPages(Math.ceil(getTableById(id).length / itemsPerPage));
                editCustomTable(id, getTableById(id));
                setLoadingData(false);
                return () => {
                    removeCustomTable(id);
                }
            }
        }, [getTableById(id)]);
    }

    const currentItems = getTableById(id)
        .filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .slice(indexOfFirstItem, indexOfLastItem)
        .sort((a, b) => {
            const column = sortBy.column;
            if (column) {
                const aValue = a[column].toString().toLowerCase();
                const bValue = b[column].toString().toLowerCase();
                return sortBy.ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            return true;
        });


    const handlePageChange = async (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(currentPage);
    };

    const handleSort = (columnName) => {
        setSortBy((prevSortBy) => {
            const column = columns.find(col => col.accessorKey === columnName);
            const originalColumnName = column ? column.accessorKey : columnName;

            if (prevSortBy.column === originalColumnName) {
                // Si ya está ordenado por esta columna, invierte el orden
                return { column: originalColumnName, ascending: !prevSortBy.ascending };
            } else {
                // Si es una nueva columna, ordena ascendente por defecto
                return { column: originalColumnName, ascending: true };
            }
        });
    };
    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Resetear a la primera página cuando cambia el número de ítems por página
    };
    const handleItem = (item) => {
        if (onClickItem !== null && typeof onClickItem === 'function') {
            onClickItem(item);
        }
    }

    return (
        <div className="my-4 rounded-xl background-secondary container mx-auto p-4">
            {/* Buscador */}
            <div className={`${title === null ? 'relative' : 'max-md:block flex justify-between items-center mx-4 my-2'}`}>
                {title && (<h2 className="my-0">{title}</h2>)}
                <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar..."
                    name="Buscar"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="primary-input max-md:w-full pl-10"
                />
                <HiSearch className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            
                </div>
                </div>
            {/* Contenido de la tabla */}
            <div className="overflow-x-auto">
                {
                    getTableById(id).length <= 0
                        ? (
                            <div className="m-4 flex items-center justify-center overflow-y-hidden">
                                {
                                    loadingData === false
                                        ? (<h4 className="mb-1 text-xl font-bold text-dark dark:text-white">No hay datos</h4>)
                                        : (<CustomLoading />)
                                }
                            </div>
                        )
                        : (
                            <table className="w-full table-auto mt-4 border border-collapse rounded-xl overflow-hidden">
                                <thead className="bg-primary-light dark:bg-secondary-dark">
                                    <tr>
                                        {columns.map((column, index) => {
                                            const originalColumnName = columns.length > 0 ? column.accessorKey : column.header;

                                            return (
                                                <th
                                                    key={index}
                                                    onClick={() => handleSort(column.accessorKey)}
                                                    className="p-3 cursor-pointer border-b border-gray-300"
                                                >
                                                    <div className="flex items-center">
                                                        <span className="font-semibold">{column.header}</span>
                                                        {sortBy.column === originalColumnName && (
                                                            <span className="ml-2">
                                                                {sortBy.ascending ? (
                                                                    <HiOutlineChevronUp className="h-4 w-4" />
                                                                ) : (
                                                                    <HiOutlineChevronDown className="h-4 w-4" />
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </th>
                                            );
                                        })}
                                        {actionsColumn && (
                                            <th className="p-3 cursor-pointer border-b border-gray-300">
                                                <div className="flex items-center">
                                                    <span className="font-semibold">Acciones</span>
                                                </div>
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ? (currentItems.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={`${rowFilled ? (index % 2 === 0 ? 'bg-secondary-light dark:bg-primary-dark' : 'bg-primary-light dark:bg-secondary-dark') : 'bg-white dark:bg-gray-800'} ${onClickItem ? 'cursor-pointer' : ''}`}
                                            onClick={() => handleItem(item)}
                                        >
                                            {columns.map((column, columnIndex) => (
                                                <td key={columnIndex} className="p-3 border-b border-gray-300" >
                                                    {item[column.accessorKey]}
                                                </td>
                                            ))}
                                            {actionsColumn && (
                                                <td className="p-3 border-b border-gray-300">
                                                    <div className="flex items-center space-x-2">
                                                        <CustomModal
                                                            id={`editar-${index}`}
                                                            formId={item[columns[0].accessorKey]}
                                                            formAction="Editar"
                                                            buttonTitle={<HiPencilAlt  />}
                                                            buttonStyle="btn-warning-outline"
                                                            modalTitle="Editar"
                                                            modalContent={
                                                                editForm
                                                            }
                                                            lockedBackground={true}
                                                        ></CustomModal>
                                                        {onlyEdit === false && (
                                                            <CustomModal
                                                                id={`eliminar-${index}`}
                                                                buttonTitle={<HiOutlineTrash />}
                                                                funcionAdd={true}
                                                                buttonStyle="btn-danger-outline"
                                                                modalTitle="¿Desea eliminar este ítem?"
                                                                modalContent={
                                                                    <div className="space-x-2">
                                                                        <button className="btn-success" onClick={() => handleModal()}>No</button>
                                                                        <button className="btn-danger" onClick={
                                                                            () => handleDeleteItem(item[columns[0].accessorKey], index)
                                                                        }>
                                                                            Sí
                                                                        </button>
                                                                    </div>
                                                                }
                                                            ></CustomModal>
                                                        )}

                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    )))
                                        : (<tr className="text-center"><td colSpan={columns.length}>No se encontraron resultados</td></tr>)}
                                </tbody>
                            </table>
                        )
                }
            </div>
            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center"> {/* Agregado space-x-2 para espacio entre los elementos */}
                    <label className="mr-2" htmlFor="filasPorPagina">Filas por página:</label>
                    <select
                        className="select-input min-w-20"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        name="filasPorPagina"
                        id="filasPorPagina"
                    >
                        {defaultItemsPerPage !== null ? (
                            <option value={defaultItemsPerPage}>{defaultItemsPerPage}</option>
                        ) : (
                            <>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </>
                        )}
                    </select>
                </div>
                <div className='flex'>
                    <p className="text-color-primary">
                        Página {currentPage} de {totalPages}
                    </p>
                </div>
                <ul className="flex">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <li
                            key={index}
                        >
                            <button onClick={() => handlePageChange(index + 1)}
                                className={`cursor-pointer ${currentPage === index + 1
                                    ? 'btn-primary'
                                    : 'btn-primary-outline'
                                    }`}>{index + 1}</button>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

CustomTable.propTypes = {
    id: PropTypes.string.isRequired,
}