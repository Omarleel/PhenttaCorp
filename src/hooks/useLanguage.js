import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, updateLocalStorageLanguage } from "../store";

export const useLanguage = () => {
  const dispatch = useDispatch();
  const { language } = useSelector(state => state.language);

  useEffect(() => {
    // Check if language is not set in Redux state
    if (!language) {
      // Determine default language based on user's preferred settings
      const userLanguage = navigator.language || navigator.userLanguage;
      const defaultLanguage = userLanguage.startsWith("en") ? "en" : "es";

      dispatch(setLanguage(defaultLanguage));
    }
  }, [dispatch, language]);

  useEffect(() => {
    // Update language in localStorage when it changes
    updateLocalStorageLanguage(language);
  }, [language]);

  const setPreferredLanguage = (lang) => {
    // Dispatch action to set the preferred language
    dispatch(setLanguage(lang));
  };

  return {
    language,
    setPreferredLanguage
  };
};
