import React, { useState, useEffect } from 'react';

// Colores disponibles para las palabras
const colors = [
    'bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400',
    'bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-fuchsia-200 to-fuchsia-400',
    'bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400',
    'bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-200 to-green-400',
    'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400', 
    'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-200 to-purple-400',
    'bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400',
];

export const CustomAnimatedText = ({ plainText = '', words = [], className = '' }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, [words.length]);

    return (
        <div className={`${className}`}>
            {/* Texto principal */}
            <span>{plainText}</span>

            {/* Palabras con colores distintos */}
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`pt-1 pb-2 animate-pulse transition-opacity duration-500 ${index === currentWordIndex ? 'block' : 'hidden'
                        } ${colors[index % colors.length]}`} // Asigna un color único basado en el índice
                >
                    {word}
                </span>
            ))}
        </div>
    );
};
