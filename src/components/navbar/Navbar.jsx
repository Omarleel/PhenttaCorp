import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineGlobeAlt } from 'react-icons/hi';
import { rutaLogoPimarioDark, rutaLogoPimarioLight, sizeIcons } from '../../constants/constants';
import './navbar.css';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { menus } from '../../mocks/data';

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setPreferredLanguage, language } = useLanguage();
  const dropdownRef = useRef(null);
  const { isDark } = useTheme();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdown = (code) => {
    setIsDropdownOpen(false);
    setPreferredLanguage(code);
  };

  // Obtener el menú correspondiente al idioma actual seleccionado
  const currentMenu = menus.find(menu => menu.idioma === language);

  return (
    <nav className="container-navbar">
      <div className="container-logo">
        <NavLink to="/home">
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
                <h4 className="my-0">{menuItem.label}</h4>
              </NavLink>
            )
        ))}
        <div>
          <button onClick={toggleDropdown} className="menu-navbar my-0">
            <HiOutlineGlobeAlt size={sizeIcons} />
          </button>
          <div
            ref={dropdownRef}
            className={`${isDropdownOpen ? 'h-20' : 'h-0'} absolute rounded-b right-0 top-[72px] w-36 background-secondary transition-all duration-300`}
          >
            <ul className={`${isDropdownOpen ? 'opacity-100' : 'opacity-0'} transition-all duration-200`}>
              {currentMenu.base.find(item => item.label === 'Idiomas' || item.label === 'Languages')?.items.map((idioma, index) => (
                <li className='cursor-pointer' key={index}>
                  <a className="menu-navbar" onClick={() => handleDropdown(idioma.code)}>
                    {idioma.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
