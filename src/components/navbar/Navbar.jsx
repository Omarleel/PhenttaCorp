import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineGlobeAlt, HiMoon, HiSun } from 'react-icons/hi';
import { rutaLogoPimarioDark, rutaLogoPimarioLight, sizeIcons } from '../../constants/constants';
import './navbar.css';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { rutas } from '../../mocks/data';


export const Navbar = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const { setPreferredLanguage, language } = useLanguage();
  const { isDark, handleThemeSwitch } = useTheme();
  const submenuRef = useRef(null);
  const globeButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verificar si se hizo clic fuera del submenu y fuera del botón que abre el submenu
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target) &&
        globeButtonRef.current &&
        !globeButtonRef.current.contains(event.target)
      ) {
        // Cerrar el submenu solo si está abierto
        if (showSubmenu) {
          setShowSubmenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSubmenu]); // El efecto se ejecuta cuando showSubmenu cambia

  const handleToggleDropdown = () => {
    setShowSubmenu(!showSubmenu);
  };

  const handleDropdown = (code) => {
    // Cerrar el submenu al seleccionar un idioma
    setShowSubmenu(false);
    setPreferredLanguage(code);
  };

  // Obtener el menú correspondiente al idioma actual seleccionado
  const currentMenu = rutas.find((menu) => menu.idioma === language);

  return (
    <nav className="container-navbar">
      <div className="container-logo">
        <NavLink to="/">
          <img className="h-9 min-w-fit" src={isDark ? rutaLogoPimarioDark : rutaLogoPimarioLight} alt="Logo" />
        </NavLink>
      </div>
      <div className="container-menu">
        {currentMenu.base.map((menuItem, index) =>
          menuItem.hasOwnProperty('items') ? (
            <React.Fragment key={index}>
              {/* Agrega código para manejar los elementos con submenús si es necesario */}
            </React.Fragment>
          ) : (
            menuItem.visible === true && (<NavLink key={menuItem.label} to={menuItem.link} className={({ isActive }) => `${isActive ? 'current-menu' : 'menu'} z-20`}>
              <span className="my-0 whitespace-nowrap">{menuItem.label}</span>
            </NavLink>)
          )
        )}
        <div>
          <button ref={globeButtonRef} className="menu my-0 relative z-20" onClick={handleToggleDropdown}>
            <HiOutlineGlobeAlt size={sizeIcons} />
          </button>
          <div
            ref={submenuRef}
            className={`${showSubmenu ? 'top-0 visible' : 'top-[-30px] invisible'} z-10 absolute shadow-md rounded-b right-20 top-[72px] w-36 background-secondary transition-all duration-300 flex flex-col justify-center`}
          >
            <ul className={`sub-menu`}>
              {currentMenu.base
                .find((item) => item.label === 'Idiomas' || item.label === 'Languages')
                ?.items.map((idioma, index) => (
                  <li className={`cursor-pointer ${showSubmenu ? 'pointer-events-auto' : 'pointer-events-none'}`} key={index}>
                    <button className={` menu`} onClick={() => handleDropdown(idioma.code)}>
                      {idioma.label}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="container-menu">
          <button onClick={handleThemeSwitch} className="menu">
            {isDark ? <HiMoon size={sizeIcons} /> : <HiSun size={sizeIcons} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
