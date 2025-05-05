import React, { useState } from "react";

const Carousel = () => {
    const images = [
        "./main-hall-view-aljamia-tahirpur.jpg",
        "./all-student-view-main-hall-aljamia-tahirpur.jpg",
        "./front-building-view-aljamia-tahirpur.jpg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
            setIsAnimating(false);
        }, 500); // Match animation duration
    };

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
            setIsAnimating(false);
        }, 500); // Match animation duration
    };

    return (
        <div className="relative w-full h-atuo mx-auto overflow-hidden pb-0">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>
            <button
                onClick={handlePrev}
                className="cursor-pointer absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-700 text-white p-2 rounded-full hover:bg-green-800 z-10 text-sm md:text-base lg:text-lg md:size-5"
                style={{ width: "40px", height: "40px" }}
            >
                &#8592;
            </button>
            <button
                onClick={handleNext}
                className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-700 text-white p-2 rounded-full hover:bg-green-800 z-10 text-sm md:text-base lg:text-lg"
                style={{ width: "40px", height: "40px" }}
            >
                &#8594;
            </button>
        </div>
    );
};

export default Carousel;
