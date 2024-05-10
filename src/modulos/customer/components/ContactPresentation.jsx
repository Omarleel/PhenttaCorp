import { useLanguage } from "../../../hooks";
import { contactanos } from "../../../mocks/data";

export const ContactPresentation = () => {
    const { language } = useLanguage();
    const dataContactanos = contactanos.find(contactanos => contactanos.idioma === language);
    return (
        <div className={`background-secondary flex max-md:flex-col items-center h-screen`}>
            <div className="md:w-2/4 max-sm:hidden">
                <img src="/assets/images/contact/presentation.svg" />
            </div>
            <div className="md:w-2/4 text-center m-12 my-auto ">
                <h1>{dataContactanos.titulo}</h1>
                <h2>{dataContactanos.base[0].title}</h2>
                <p>{dataContactanos.base[0].description}</p>
                <div className="flex flex-col w-2/4 max-w-80 mx-auto my-2 space-y-2">
                    <button onClick={() => false } className="btn-primary">{dataContactanos.base[1].btnPrimary}</button>
                    <button onClick={() => false } className="btn-primary-outline">{dataContactanos.base[1].btnSecondary}</button>
                </div>
            </div>
        </div>
    )
}
