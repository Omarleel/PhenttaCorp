import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const CustomDate = () => {
  // Obtener la fecha y hora actual
  const now = new Date();

  // Formatear la fecha y hora en formato español
  const formattedDate = format(now, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });

  // Función para capitalizar la primera letra de cada palabra, excepto "de"
  const capitalizeWords = (str) => {
    const words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i].toLowerCase() !== 'de') {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
    }
    return words.join(' ');
  };

  return (
    <span>{capitalizeWords(formattedDate)}</span>
  );
};
