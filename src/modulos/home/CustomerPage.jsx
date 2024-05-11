import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { HomePage } from '../customer/HomePage';
import { Navbar } from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';
import { rutas } from '../../mocks/data';
import { useLanguage } from '../../hooks/useLanguage';
import { ContactUsPage } from '../customer/ContactUsPage';
import { AboutUsPage } from '../customer/AboutUsPage';
import { CustomWhatsappFloatingButton } from '../../components/CustomWhatsappFloatingButton';
import { JobsPage } from '../customer/JobsPage';

export const CustomerPage = () => {
  const { language } = useLanguage();
  const menu = rutas.find(menu => menu.idioma === language);

  return (
    <div className="flex h-screen bg-primary-light dark:bg-primary-dark dark:text-white">
      <Sidebar />
      <section id="primary-container" className="w-full">
        <Navbar />
        <Routes>
          {menu.base.slice(0, 2).map((menuItem, index) => ( // Definimos solo las rutas que llevan a la misma pagina
            <Route key={index} path={menuItem.link} element={<HomePage />} />
          ))}
          <Route path={menu.base[2].link} element={<AboutUsPage />} />
          <Route path={menu.base[3].link} element={<ContactUsPage />} />
          <Route path={menu.base[4].link} element={<JobsPage />} />
          <Route path="*" element={<Navigate to={menu.base[0].link} />} />
        </Routes>
        <CustomWhatsappFloatingButton/>
        <Footer />
      </section>
    </div>
  );
};
