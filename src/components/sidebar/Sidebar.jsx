import React, { useState } from 'react';
import { HiOutlineMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './sidebar.css'
import Swal from 'sweetalert2';
import { customClass } from '../../constants/colors';
import { sizeIcons } from '../../constants/constants';
import { useLanguage } from '../../hooks/useLanguage';
import { rutas } from '../../mocks/data';
export const Sidebar = ({ backgroundLocked = false }) => {
  const { setPreferredLanguage, language } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const status = "none"; // Define el estado de autenticación
  const { isDark, handleThemeSwitch } = useTheme(); // Tema y función de cambio de tema


  const toggleSidebar = () => {
    const submenu = document.getElementById("submenu2");
    if (!isSidebarOpen === false) {
      setTimeout(() => {
        submenu.classList.add("hidden");
      }, 200);
    }
    else {
      submenu.classList.add("block");
    }
    if (isSidebarOpen) {
      setShowSubmenu(false);
    }
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleDropdown = (code) => {
    setShowSubmenu(false);
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
  const currentMenu = rutas.find(menu => menu.idioma === language);

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
      <div
        className={`fixed mt-[72px] z-10 w-full h-screen bg-black opacity-50 ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={backgroundLocked === false ? toggleSidebar : undefined}
      >
      </div>
      <nav className={`background-secondary z-50 container-menu-sidebar ${isSidebarOpen ? 'max-sm:left-0' : 'max-sm:left-[-250px] sm:w-20'}`}>
        <ul className="p-4">
          {/* Renderizar elementos del menú */}
          {currentMenu.base.map((menuItem, index) => (
            // Evaluar si el elemento de menú tiene submenús (items)
            menuItem.items ? (
              <li key={index} className="mb-2">
                <button
                  className='!pl-6 menu'
                  onClick={() => {
                    setIsSidebarOpen(true);
                    setShowSubmenu(!showSubmenu);
                  }}
                >
                  {menuItem.label}
                </button>
                {/* Renderizar submenú */}
                <ul id="submenu2" className={`ml-4 ${showSubmenu ? 'h-20' : 'h-0'} sub-menu background-primary`}>
                  {currentMenu.base.find(item => item.label === 'Idiomas' || item.label === 'Languages')?.items.map((idioma, subIndex) => (
                    <li className={`cursor-pointer ${showSubmenu ? 'pointer-events-auto' : 'pointer-events-none'}`} key={subIndex}>
                      <a className={`${showSubmenu ? 'visible' : 'invisible'} menu`} onClick={() => handleDropdown(idioma.code)}>
                        {idioma.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              // Renderizar enlace normal si no tiene submenús
              menuItem.visible === true && (
                <li key={index} className="mb-2 menu-container">
                  <NavLink
                    to={menuItem.link}
                    onClick={() => setIsSidebarOpen(false)} // Cerrar sidebar al hacer clic en un enlace
                    className={({ isActive }) => `${isActive ? 'current-menu' : 'menu'}`}
                  >
                    <span className='ml-2 block'>{menuItem.label}</span>
                  </NavLink>
                </li>
              )
            )
          ))}
          <li className="mb-2">
            <button onClick={handleThemeSwitch} className='ml-2 menu !w-auto'>
              {isDark ? (<HiMoon size={sizeIcons} />) : (<HiSun size={sizeIcons} />)}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};