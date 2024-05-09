import React, { useState, useEffect } from 'react';

// Colores disponibles para las palabras
const colors = [
    'text-red-500',
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-purple-500',
    'text-indigo-500',
    'text-pink-500',
    'text-gray-500',
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
        <div className={`relative ${className}`}>
            {/* Texto principal */}
            <span className="mr-3">{plainText}</span>

            {/* Palabras con colores distintos */}
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`absolute transition-opacity duration-500 ${index === currentWordIndex ? 'opacity-100' : 'opacity-0'
                        } ${colors[index % colors.length]}`} // Asigna un color único basado en el índice
                >
                    {word}
                </span>
            ))}
        </div>
    );
};
