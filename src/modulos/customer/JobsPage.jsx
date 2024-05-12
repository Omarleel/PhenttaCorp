import { useLanguage } from "../../hooks";
import { empleos } from "../../mocks/data";

export const JobsPage = () => {
    const { language } = useLanguage();
    const dataEmpleos = empleos.find(empleo => empleo.idioma === language);
    return (
        <div className="container-page">
            <div className="max-sm:flex-col sm:flex items-center text-center py-4">
                <div className="sm:w-2/4 order-2">
                    <h1>{dataEmpleos.titulo}</h1>
                </div>
                <img className="sm:w-2/4 p-4 order-1" src="/assets/images/jobs/jobs.svg"></img>
            </div>
        </div>
    )
}
