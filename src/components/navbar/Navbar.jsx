import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { HiOutlineSearch, HiOutlineGlobeAlt, HiMoon, HiSun } from 'react-icons/hi';
import { rutaLogoPimarioDark, rutaLogoPimarioLight, sizeIcons } from '../../constants/constants';
import './navbar.css';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { menus } from '../../mocks/data';

export const Navbar = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const { setPreferredLanguage, language } = useLanguage();
  const { isDark, handleThemeSwitch } = useTheme();

  const toggleDropdown = () => {
    const submenu = document.getElementById("submenu");
    if (!showSubmenu === false) {
      setTimeout(() => {
        submenu.classList.add("hidden");
      }, 200);
    }
    else {
      submenu.classList.add("block");
    }
    setShowSubmenu(!showSubmenu);
  };
  const handleDropdown = (code) => {
    setShowSubmenu(false);
    setPreferredLanguage(code);
  };

  // Obtener el menú correspondiente al idioma actual seleccionado
  const currentMenu = menus.find(menu => menu.idioma === language);

  return (
    <nav className="container-navbar">
      <div className="container-logo">
        <NavLink to="/">
          <img className="h-9 min-w-fit" src={isDark ? rutaLogoPimarioDark : rutaLogoPimarioLight} alt="Logo" />
        </NavLink>
      </div>
      <div className="container-menu">
        {currentMenu.base.map((menuItem, index) => (
          menuItem.hasOwnProperty('items') ? (
            <React.Fragment key={index}>

            </React.Fragment>
          ) : (
            <NavLink key={menuItem.label} to={menuItem.link} className={({ isActive }) => `${isActive ? 'current-menu' : 'menu-navbar'}`}>
              <span className="my-0">{menuItem.label}</span>
            </NavLink>
          )
        ))}
        <div>
          <button onClick={toggleDropdown} className="menu-navbar my-0">
            <HiOutlineGlobeAlt size={sizeIcons} />
          </button>
          <div
            className={`${showSubmenu ? 'h-20' : 'h-0'} absolute shadow-md rounded-b right-20 top-[72px] w-36 background-secondary transition-all duration-300 flex flex-col justify-center`}
          >
            <ul id="submenu" className={`${showSubmenu ? 'h-20' : 'h-0'} background-secondary rounded transition-all duration-300 flex flex-col justify-center`}>
              {currentMenu.base.find(item => item.label === 'Idiomas' || item.label === 'Languages')?.items.map((idioma, index) => (
                <li className={`cursor-pointer ${showSubmenu ? 'pointer-events-auto' : 'pointer-events-none'}`} key={index}>
                  <a className={`${showSubmenu ? 'visible' : 'invisible'} container-menu  menu-navbar`} onClick={() => handleDropdown(idioma.code)}>
                    {idioma.label}
                  </a>
                </li>
              ))}

            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <button onClick={handleThemeSwitch} className='container-menu menu-navbar '>
              {isDark ? (<HiMoon size={sizeIcons} />) : (<HiSun size={sizeIcons} />)}
        </button>
        </div>
      </div>
      
    </nav>
  );
};
