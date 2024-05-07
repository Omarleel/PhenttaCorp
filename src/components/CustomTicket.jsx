import React, { useState } from "react";
import { HiPrinter } from "react-icons/hi";
import { customClass } from "../constants/colors";
import Swal from "sweetalert2";
import { detectarDispositivo, generateTicket } from "../utilities";

export const CustomTicket = ({ venta }) => {
  const { fecha, idMesa, cajero, mozo, subtotal, descuento, total, efectivo, vuelto, productos } = venta;

  const [base64, setBase64] = useState('');
  const [message, setMessage] = useState('');

  const handleImprimir =  () => {
    try{
      const output = detectarDispositivo() === 'Móvil' || detectarDispositivo() === 'Tablet'  ? 'b64' : 'print';
      if (!isNaN(efectivo) && efectivo !== null && efectivo > 0 && total > 0 && vuelto >= 0 && productos.length > 0) {
        Swal.fire({
          title: "¿Desea imprimir la boleta?",
          showCancelButton: true,
          confirmButtonText: "Continuar",
          cancelButtonText: "Salir",
          customClass: customClass,
        }).then(async (result) => {
          if (result.isConfirmed) {
            setBase64('');
            setMessage('');
    
            const response = await generateTicket(output, venta);
    
            if (!response?.success) {
              alert(response?.message);
              return;
            }
    
            if (output === 'b64') {
              setBase64(response?.content ?? '');
            }
    
            setMessage(response?.message);
    
            setTimeout(() => {
              setMessage('');
            }, 2000);
          }
        });
      }
      else{
        console.log(venta)
        throw new Error('Existen problemas con los montos en el formato de venta.');
      }
      
    }
    catch(error){
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        customClass: customClass,
    });
    }
    

  };

  return (
    <>
      <button className="my-2 btn-success flex items-center justify-center w-full" onClick={() => handleImprimir()}>
        <HiPrinter className="mr-2" />
        Imprimir
      </button>
      {message && <p className="mx-alert-info text-center">{message}</p>}
      {base64 && (
        <iframe
          src={`data:application/pdf;base64,${base64}`}
          className="mx-iframe w-full"
        />
      )}
    </>
  );
};
