import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { HomePage } from '../customer/HomePage';
import { Navbar } from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';
import { menus } from '../../mocks/data';
import { useLanguage } from '../../hooks/useLanguage';

export const CustomerPage = () => {
  const { language } = useLanguage();
  const menu = menus.find(menu => menu.idioma === language);

  return (
    <div className="flex h-screen bg-primary-light dark:bg-primary-dark dark:text-white">
      <Sidebar />
      <section id="primary-container" className="w-full">
        <Navbar />
        <Routes>
          {menu.base.map((menuItem, index) => (
            <Route key={index} path={menuItem.link} element={<HomePage />} />
          ))}
          <Route path="*" element={<Navigate to={menu.base[0].link} />} />
        </Routes>
        <Footer />
      </section>
    </div>
  );
};
