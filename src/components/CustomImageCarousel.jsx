import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const CustomImageCarousel = ({ data = [], setCurrentImage }) => {
    const containerRef = useRef(null);

    // Verifica que data sea un array antes de mapearlo
    if (!Array.isArray(data) || data.length === 0) {
        return <></>;
    }

    const scrollLeft = () => {
        containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="relative flex items-center">
            <button
                onClick={scrollLeft}
                className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full shadow-md transform -translate-y-1/2"
            >
                <FaChevronLeft />
            </button>
            <div className="overflow-x-hidden whitespace-nowrap w-full px-8">
                <div
                    ref={containerRef}
                    className="flex space-x-4"
                >
                    {data.map((item, index) => (
                        <img
                            key={index}
                            src={item.image}
                            alt={item.name}
                            onClick={() => setCurrentImage(item)}
                            className="h-16 w-auto inline-block rounded-lg cursor-pointer"
                        />
                    ))}
                </div>
            </div>
            <button
                onClick={scrollRight}
                className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full shadow-md transform -translate-y-1/2"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};
