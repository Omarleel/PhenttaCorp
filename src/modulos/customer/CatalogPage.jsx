import { CustomBanner } from "../../components/CustomBanner"
import { CustomCatalog } from "../../components/CustomCatalog"
import { dataCatalog } from "../../mocks/data"

const fetchData = async (itemsPorPagina, paginaActual, filtros) => {
  // const response = await getCatalogo(itemsPorPagina, paginaActual, filtros);
  if (true) {
      const { responseData, totalPaginas } = {responseData: dataCatalog, totalPaginas: 1}; // response.data
      if ( responseData.length > 0 && Number.isInteger(totalPaginas) ) {
          return {
              responseData: responseData,
              totalPaginas: totalPaginas,
          };
      } else {
          return {
              responseData: [],
              totalPaginas: 1,
          };
      }
  } else {
      throw new Error('Error al obtener los carnets');
  }
}

export const CatalogPage = ({ categoria }) => {
  return (
    <div className="container-page">
        <CustomBanner></CustomBanner>
        <CustomCatalog
            // data={dataCatalog}
            dynamicData={{
              fetchData: fetchData,
          }}
        />
    </div>
  )
}
