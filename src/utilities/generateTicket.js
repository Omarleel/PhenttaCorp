import { RUC, direccion, nombreOrganizacion, rutaLogoHorizontal } from '../constants/constants.js';
import { convertirNumeroATexto } from './convertirNumeroATexto.js';
import { createPdf } from './createPdf.js';

export const generateTicket = async (output, venta) => {
  const { idTicket, idPedido, idMesa, fechaHora, cajero, mozo, subtotal, descuento, igv, total, efectivo, vuelto, productos } = venta;
  const [fecha, hora] = fechaHora.split(' ');
  const fetchLogoDataURL = async (rutaLogo) => {
    const response = await fetch(rutaLogo);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };
  const firmaQR = '20603831404|03|B002|000131|724.94|4,752.30|30/09/2023|1|70477554|v2Ez4sKStje4NiqcXiuTcmTtPwgbrqgnXpWPltJKEhk=|';
  const logoDataURL = await fetchLogoDataURL(rutaLogoHorizontal);

  const productosBody = productos.map(producto => {
    return [
      { text: producto.cantidad.toString(), style: 'tProductsBody', alignment: 'center' },
      { text: producto.nombre, style: 'tProductsBody', alignment: 'center' },
      { text: producto.precioUnitario.toFixed(2), style: 'tProductsBody', alignment: 'right' },
      { text: (producto.cantidad * producto.precioUnitario).toFixed(2), style: 'tProductsBody', alignment: 'right' }
    ];
  });
  const content = [
    //DATOS EMPRESA
    {
      image: logoDataURL, //Logo
      fit: [141.73, 56.692],
      alignment: 'center',
    },
    { text: nombreOrganizacion, style: 'header', margin: [0, 10, 0, 0] },
    { text: direccion, style: 'header' },
    { text: `RUC ${RUC}`, style: 'header' },

    //TIPO Y NUMERO DOCUMENTO
    { text: 'BOLETA DE VENTA ELECTRÓNICA', style: 'header', margin: [0, 10, 0, 2.25] },
    { text: idTicket, style: 'header', margin: [0, 2.25, 0, 0] },

    //DATOS CEBECERA FACTURAR
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ['25%', '35%', '15%', '25%'],
        body: [
          [
            { text: 'FECHA:', style: 'tHeaderLabel' },
            { text: fecha, style: 'tHeaderValue' },
            { text: 'HORA:', style: 'tHeaderLabel' },
            { text: hora, style: 'tHeaderValue' },
          ],
          [
            { text: 'PEDIDO:', style: 'tHeaderLabel' },
            { text: idPedido, style: 'tHeaderValue', colSpan: 3 },
            {},
            {},
          ],
          [
            { text: 'MESA:', style: 'tHeaderLabel' },
            { text: idMesa, style: 'tHeaderValue', colSpan: 3 },
            {},
            {},
          ],
          [
            { text: 'CAJERO:', style: 'tHeaderLabel' },
            { text: cajero, style: 'tHeaderValue', colSpan: 3 },
            {},
            {},
          ],
          [
            { text: 'MOZO:', style: 'tHeaderLabel' },
            { text: mozo, style: 'tHeaderValue', colSpan: 3 },
            {},
            {},
          ],
        ],
      },
      layout: 'noBorders',
    },
    //TABLA PRODUCTOS
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ['20%', '20%', '30%', '30%'],
        headerRows: 2,
        body: [
          [
            {
              text: 'CANT. - DESCRIPCIÓN',
              colSpan: 4,
              style: 'tProductsHeader',
            },
            {},
            {},
            {},
          ],
          [
            { text: 'CANT.', style: 'tProductsHeader' },
            { text: 'ITEM', style: 'tProductsHeader', alignment: 'center' },
            { text: 'PRECIO', style: 'tProductsHeader', alignment: 'right' },
            { text: 'TOTAL', style: 'tProductsHeader', alignment: 'right' },
          ],
          // Aquí agregamos los datos de los productos
          ...productosBody
        ],
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === 1 ? 0.5 : 0;
        },
        vLineWidth: function (i, node) {
          return 0;
        },
        hLineColor: function () {
          return '#f2f0f0';
        },
        paddingTop: function (i, node) {
          return i % 2 === 0 ? 10 : 1;
        },
      },

      layout: {
        hLineWidth: function (i, node) {
          return i === 2 ? 0.5 : 0;
        },
        vLineWidth: function (i, node) {
          return 0;
        },
        hLineColor: function () {
          return '#f2f0f0';
        },
        paddingTop: function (i, node) {
          return i % 2 === 0 ? 10 : 1;
        },
      },
    },
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ['25%', '35%', '15%', '25%'],
        body: [
          //TOTALES
          [
            { text: 'SUBTOTAL: S/', style: 'tTotals', colSpan: 2 },
            {},
            { text: subtotal.toFixed(2), style: 'tTotals', colSpan: 2 },
            {},
          ],
          [
            { text: 'DESCUENTO : S/', style: 'tTotals', colSpan: 2 },
            {},
            { text: descuento.toFixed(2), style: 'tTotals', colSpan: 2 },
            {},
          ],
          [
            { text: 'I.G.V: S/', style: 'tTotals', colSpan: 2 },
            {},
            { text: igv.toFixed(2), style: 'tTotals', colSpan: 2 },
            {},
          ],
          [
            { text: 'TOTAL: S/', style: 'tTotals', colSpan: 2 },
            {},
            { text: total.toFixed(2), style: 'tTotals', colSpan: 2 },
            {},
          ],
          //TOTAL IMPORTE EN LETRAS
          [
            {
              text: 'IMPORTE EN LETRAS:',
              style: 'tTotals',
              alignment: 'left',
              colSpan: 4,
              margin: [0, 4, 0, 0],
            },
            {},
            {},
            {},
          ],
          [
            {
              text: `SON: ${convertirNumeroATexto(total)}`,
              style: 'tProductsBody',
              colSpan: 4,
            },
            {},
            {},
            {},
          ],
          //FORMAS PAGO
          [
            {
              text: 'FORMA DE PAGO:',
              style: 'tTotals',
              alignment: 'left',
              colSpan: 4,
              margin: [0, 4, 0, 0],
            },
            {},
            {},
            {},
          ],
          [{ text: 'CONTADO', style: 'tProductsBody', colSpan: 4 }, {}, {}, {}],
          [
            { text: 'EFECTIVO: S/', style: 'tTotals', colSpan: 2 },
            {},
            { text: efectivo.toFixed(2), style: 'tTotals', colSpan: 2 },
            {},
          ],
          [
            { text: 'VUELTO: S/', style: 'tTotals', colSpan: 2 },
            {},
            { text: vuelto.toFixed(2), style: 'tTotals', colSpan: 2 },
            {},
          ],
        ],
      },
      layout: 'noBorders',
    },
    //NOTA DE PIE
    {
      text: 'Gracias por su preferencia.',
      style: 'text',
      alignment: 'center',
      margin: [0, 5],
    },
    //QR FACTURA
    {
      stack: [
        {
          qr: firmaQR,
          fit: 115,
          alignment: 'center',
          eccLevel: 'Q',
          margin: [0, 10, 0, 3],
        },
        {
          text: 'Representación impresa del comprobante de venta electrónica. Consulta tu comprobante aquí:',
          style: 'text',
        },
        {
          text: 'https://facturaelectronica.phentta.com/cpe/ace72300-0dfb-42d2-9ed7-0ba6e3cee01f',
          link: 'https://facturaelectronica.phentta.com/cpe/ace72300-0dfb-42d2-9ed7-0ba6e3cee01f',
          style: 'link',
        },
      ],
    },
  ];

  const response = await createPdf({ content }, output, idTicket);
  return response;
};