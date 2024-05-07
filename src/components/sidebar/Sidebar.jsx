import React, { useState } from 'react';
import { HiOutlineMenu, HiX, HiOutlineHome, HiOutlineDeviceMobile, HiOutlineMap, HiOutlineUser, HiOutlineCog, HiOutlineHeart, HiSun, HiMoon, HiOutlineLogout } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './sidebar.css'
import Swal from 'sweetalert2';
import { customClass } from '../../constants/colors';
import { sizeIcons } from '../../constants/constants';
import { useLanguage } from '../../hooks/useLanguage';
import { menus } from '../../mocks/data';
export const Sidebar = () => {
  const { setPreferredLanguage, language } = useLanguage();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const status = "none"; // Define el estado de autenticación
  const { isDark, handleThemeSwitch } = useTheme(); // Tema y función de cambio de tema
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la apertura/cierre del sidebar

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setShowSubmenu(false);
    }
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleDropdown = (code) => {
    setIsSidebarOpen(false);
    setPreferredLanguage(code);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      customClass: customClass,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Sesión cerrada')
      }
    });
  };

  // Obtener el menú correspondiente al idioma actual seleccionado
  const currentMenu = menus.find(menu => menu.idioma === language); // Puedes cambiar 'es' por el idioma actual seleccionado

  return (
    <aside className="container-sidebar">
      <div className="container-toggle">
        <button
          className={`btn-toggle transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'rotate-180' : ''}`}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <HiX size={sizeIcons} />
          ) : (
            <HiOutlineMenu size={sizeIcons} />
          )}
        </button>
      </div>
      <nav className={`background-secondary container-menu-sidebar ${isSidebarOpen ? 'max-sm:left-0' : 'max-sm:left-[-250px] sm:w-20'}`}>
        <ul className="p-4">
          {/* Renderizar elementos del menú */}
          {currentMenu.base.map((menuItem, index) => (
            <li key={index} className="mb-2">
              {/* Evaluar si el elemento de menú tiene submenús (items) */}
              {menuItem.items ? (
                <>
                  <button
                    className='w-full menu-sidebar menu-container cursor-pointer'
                    onClick={() => {
                      setIsSidebarOpen(true);
                      setShowSubmenu(!showSubmenu);
                    }}
                  >
                    {menuItem.label}
                  </button>
                  {/* Renderizar submenú */}
                  <ul className={`ml-4 ${showSubmenu ? 'h-auto' : 'h-0'} background-primary rounded transition-all duration-300`}>
                    {currentMenu.base.find(item => item.label === 'Idiomas' ||  item.label === 'Languages')?.items.map((idioma, index) => (
                      <li className='cursor-pointer' key={index}>
                        <a className={`${showSubmenu ? 'visible' : 'invisible'} menu-sidebar menu-container`} onClick={() => handleDropdown(idioma.code)}>
                          {idioma.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                // Renderizar enlace normal si no tiene submenús
                <NavLink
                  to={menuItem.link}
                  onClick={() => setIsSidebarOpen(false)} // Cerrar sidebar al hacer clic en un enlace
                  className={({ isActive }) => `${isActive ? 'current-menu' : 'menu-sidebar'} menu-container`}
                >
                  <span className='ml-2 block'>{menuItem.label}</span>
                </NavLink>
              )}
            </li>
          ))}
          <li className="mb-2">
            <a href="#" onClick={handleThemeSwitch} className='menu-sidebar menu-container'>
              <div className="flex items-center">
                {isDark ? (<><HiMoon size={sizeIcons} /><span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}> Tema oscuro</span></>) : (<><HiSun size={sizeIcons} /> <span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Tema claro</span></>)}
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};