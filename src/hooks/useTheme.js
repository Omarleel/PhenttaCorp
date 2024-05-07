import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, updateLocalStorageTheme } from "../store";

export const useTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector( state => state.theme );
  const isDark = theme === 'dark';

  useEffect(() => {
    if ( !theme ) {
      if ( window.matchMedia("(prefers-color-scheme: dark)").matches ){
        dispatch( setTheme ( "dark" ));
      } else {
        dispatch( setTheme( "light" ));
      }
    }
  }, [ dispatch, theme ]);

  useEffect(() => {
    if ( theme === "dark" ) {
      document.documentElement.classList.add( "dark" );
    } else {
      document.documentElement.classList.remove( "dark" );
    }
    updateLocalStorageTheme( theme );
  }, [ theme ]);

  const handleThemeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch( setTheme( newTheme ));
  };

  return {
    theme,
    isDark,
    handleThemeSwitch
  }
}
