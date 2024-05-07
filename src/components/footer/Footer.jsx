import { celular, correo, dominio, nombreOrganizacion, sizeIcons } from "../../constants/constants";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { HiPhone, HiMail } from "react-icons/hi";
import { detectarDispositivo } from "../../utilities/utils";
import { useEffect, useState } from "react";

export const Footer = () => {
    const [whatsappShareUrl, setWhatsappShareUrl] = useState("");
    useEffect(() => {
        const dispositivo = detectarDispositivo();
        if (dispositivo === 'PC') {
            setWhatsappShareUrl(`https://web.whatsapp.com/send/?phone=51${celular}&text=Hola ${nombreOrganizacion}, quisiera adquirir un nuevo celular.`);
        }
        else {
            setWhatsappShareUrl(`https://api.whatsapp.com/send/?phone=51${celular}&text=Hola ${nombreOrganizacion}, quisiera adquirir un nuevo celular.`);
        }
    }, [])

    return (
        <footer className="container-page !bg-secondary-light dark:!bg-secondary-dark !mt-0 p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                {/* Sección "Quiénes somos" */}
                <div>
                    <h2 className="mb-3">¿Quieres llevar tu empresa al siguiente nivel? </h2>
                    <p className="text-center">
                        Contáctanos hoy mismo.
                    </p>
                    <div className="flex justify-between">
                        <div className="flex items-center space-x-1">
                            <HiPhone size={sizeIcons}/>
                            <div className="flex flex-col">
                                <span>Por teléfono</span>
                                <span>(+51) {celular}</span>
                            </div>

                        </div>
                        <div className="flex items-center space-x-1">
                            <HiMail size={sizeIcons}/>
                            <div className="flex flex-col">
                                <span>Por email</span>
                                <span>{correo}</span>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Sección "Redes sociales" */}
                <div>
                    <h3 className="mb-3">Nuestras redes sociales</h3>
                    <div className="flex justify-center items-center space-x-4">
                        <a href="https://www.facebook.com/NeoPhone.Pe/" target="_blank">
                            <FaFacebook size={sizeIcons} className="icon-button bg-facebook" />
                        </a>
                        <a href="https://www.instagram.com/NeoPhone.Pe/" target="_blank">
                            <FaInstagram size={sizeIcons} className="icon-button bg-instagram" />
                        </a>
                        <a className="btn-whatsapp" target="_blank" href={`${whatsappShareUrl}`}>
                            <FaWhatsapp size={sizeIcons} className="icon-button bg-whatsapp" />
                        </a>
                        <a href="#" target="_blank">
                            <FaYoutube size={sizeIcons} className="icon-button bg-youtube" />
                        </a>
                    </div>
                </div>

               
            </div>

            {/* Footer bottom */}
            <div className="footer-bottom mt-6 text-sm text-center">
                <p>© 2024 Todos los Derechos Reservados - <a href={`https://${dominio}`} className="text-primary font-bold hover:underline">{nombreOrganizacion}</a></p>
            </div>
        </footer>
    );
};
