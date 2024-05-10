import React, { useState, useEffect } from 'react';

// Colores disponibles para las palabras
const colors = [
    'bg-clip-text text-transparent bg-gradient-to-r from-[#CF0000] to-[#CF0000] dark:from-gray-400 dark:via-gray-200 dark:to-gray-400',
    'bg-clip-text text-transparent bg-gradient-to-r from-[#F12711] to-[#F5AF19] dark:from-fuchsia-400 dark:via-fuchsia-200 dark:to-fuchsia-400',
    'bg-clip-text text-transparent bg-gradient-to-r from-[#cc2b5e] to-[#753a88] dark:from-yellow-400 dark:via-yellow-200 dark:to-yellow-400',
    'bg-clip-text text-transparent bg-gradient-to-r from-[#C31432] to-[#240B36] dark:from-green-400 dark:via-green-200 dark:to-green-400',
    'bg-clip-text text-transparent bg-gradient-to-r from-[#EE0979] to-[#FF6A00] dark:from-blue-400 dark:via-blue-200 dark:to-blue-400', 
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
