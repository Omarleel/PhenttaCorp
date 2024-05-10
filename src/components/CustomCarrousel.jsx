import React, { useState, useEffect, useRef } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export const CustomCarousel = ({ children, autoPlay = true, emulateTouch = true, interval = 8000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const carouselRef = useRef(null);
    const timerRef = useRef(null);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1));
    };
  
    const handleIndicatorClick = (index) => {
      setCurrentIndex(index);
    };
  
    // Función para reiniciar el temporizador de autoPlay
    const restartAutoPlayTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current); // Limpiar temporizador existente
      }
  
      // Configurar nuevo temporizador
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1));
      }, interval);
    };
  
    useEffect(() => {
      // Iniciar autoPlay al cargar el componente
      if (autoPlay) {
        restartAutoPlayTimer();
      }
  
      // Limpiar temporizador al desmontar el componente
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [autoPlay, children, interval]);
  
    const handleDragStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches ? e.touches[0].clientX : e.clientX);
  
      // Reiniciar el temporizador cuando se inicia el arrastre
      restartAutoPlayTimer();
    };
  
    const handleDragMove = (e) => {
      if (isDragging) {
        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const difference = startX - currentX;
  
        if (Math.abs(difference) > 50) {
          // Determinar la dirección del deslizamiento
          if (difference > 0) {
            handleNext(); // Avanzar al siguiente slide
          } else {
            handlePrev(); // Retroceder al slide anterior
          }
          setStartX(currentX); // Actualizar la posición inicial
          setIsDragging(false); // Desactivar el arrastre para permitir un solo deslizamiento por evento
        }
      }
    };
  
    const handleDragEnd = () => {
      setIsDragging(false);
    };
  
    useEffect(() => {
      const element = carouselRef.current;
      if (element) {
        element.addEventListener("mousemove", handleDragMove, { passive: true });
        element.addEventListener("mouseup", handleDragEnd);
        element.addEventListener("touchmove", handleDragMove, { passive: true });
        element.addEventListener("touchend", handleDragEnd);
      }
  
      return () => {
        if (element) {
          element.removeEventListener("mousemove", handleDragMove, { passive: true });
          element.removeEventListener("mouseup", handleDragEnd);
          element.removeEventListener("touchmove", handleDragMove, { passive: true });
          element.removeEventListener("touchend", handleDragEnd);
        }
      };
    }, [handleDragMove, handleDragEnd]);

  return (
    <div
      ref={carouselRef}
      className="relative"
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div className="rounded-lg overflow-hidden relative">
        <div
          className="flex transition-transform ease-in-out duration-300"
          style={{
            width: `${React.Children.count(children) * 100}%`,
            transform: `translateX(-${(currentIndex / React.Children.count(children)) * 100}%)`
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 select-none"
              style={{ width: `${100 / React.Children.count(children)}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`h-2 w-2 rounded-full mx-1 focus:outline-none ${
                index === currentIndex ? 'bg-gray-800 dark:bg-slate-500' : 'bg-gray-400 dark:bg-white'
            }`}
          />
        ))}
      </div>

      <button
        className="absolute h-full opacity-50 left-0 top-1/2 transform -translate-y-1/2 background-secondary rounded p-2"
        onClick={handlePrev}
      >
        <HiOutlineChevronLeft />
      </button>
      <button
        className="absolute h-full opacity-50 right-0 top-1/2 transform -translate-y-1/2 background-secondary rounded p-2"
        onClick={handleNext}
      >
        <HiOutlineChevronRight />
      </button>
    </div>
  );
};