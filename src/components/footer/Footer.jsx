import React from 'react';
import { celular, correo, dominio, nombreOrganizacion, rutaLogoPimarioDark, rutaLogoPimarioLight, sizeIcons, urlFacebook, urlInstagram, urlYoutube } from "../../constants/constants";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { HiPhone, HiMail } from "react-icons/hi";
import { getWhatsappUrl } from "../../utilities/utils";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { contactanosFooter, derechosReservados, encontrarnos } from "../../mocks/data";

export const Footer = () => {
    const { language } = useLanguage();
    const { isDark } = useTheme();
    const [whatsappShareUrl, setWhatsappShareUrl] = useState("");
    const dataContactanosFooter = contactanosFooter.find(contactanos => contactanos.idioma === language)['base'];
    const dataEncontrarnos = encontrarnos.find(encontrarnos => encontrarnos.idioma === language)['base'];
    const dataDerechosReservados = derechosReservados.find(derechosReservados => derechosReservados.idioma === language)['base'];
    useEffect(() => {
        const urlWhatsapp = getWhatsappUrl();
        setWhatsappShareUrl(urlWhatsapp);
    }, [])

    return (
        <footer className="container-page !bg-secondary-light dark:!bg-secondary-dark !mt-0 p-6 shadow-top-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                {/* Sección "Quiénes somos" */}
                <div>
                {dataContactanosFooter && dataContactanosFooter.map((contactanos, index) => (
                    <React.Fragment key={index}>
                        <h3 className="mb-3">{contactanos.title} </h3>
                        <p className="text-center">
                            {contactanos.description}
                        </p>
                    </React.Fragment>
                ))}
                    <div className="flex justify-between mt-2">
                        <div className="flex items-center space-x-2">
                            <HiPhone size={sizeIcons}/>
                            <div className="flex flex-col hover-text hover:underline max-sm:text-sm">
                                <a href={`tel:51${celular}`}>(+51) {celular}</a>
                            </div>

                        </div>
                        <div className="flex items-center space-x-2">
                            <HiMail size={sizeIcons}/>
                            <div className="flex flex-col hover-text hover:underline max-sm:text-sm">
                                <a href={`mailto:${correo}`}>{correo}</a>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Sección "Redes sociales" */}
                <div className="flex flex-col items-center justify-center mt-4">
                <img className="h-9 min-w-fit" src={isDark ? rutaLogoPimarioDark : rutaLogoPimarioLight} alt="Logo" />
                    <h4 className="!mt-3 !mb-2">{dataEncontrarnos[0].title}</h4>
                    <div className="flex justify-center items-center space-x-4">
                        <a href={urlFacebook} target="_blank">
                            <FaFacebook size={sizeIcons} className="icon-button bg-facebook" />
                        </a>
                        <a href={urlInstagram} target="_blank">
                            <FaInstagram size={sizeIcons} className="icon-button bg-instagram" />
                        </a>
                        <a className="btn-whatsapp" target="_blank" href={`${whatsappShareUrl}`}>
                            <FaWhatsapp size={sizeIcons} className="icon-button bg-whatsapp" />
                        </a>
                        <a href={urlYoutube} target="_blank">
                            <FaYoutube size={sizeIcons} className="icon-button bg-youtube" />
                        </a>
                    </div>
                </div>

               
            </div>

            {/* Footer bottom */}
            <div className="footer-bottom mt-6 text-sm text-center">
                <p>© 2024 {dataDerechosReservados[0].title} - <a href={`https://${dominio}`} className="text-primary font-bold hover-text">{nombreOrganizacion}</a></p>
            </div>
        </footer>
    );
};
