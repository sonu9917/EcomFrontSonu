import React, { useState, useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 p-4 bg-[#ef9364] text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out ${isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'}`}
            aria-label="Scroll to Top"
        >
            <AiOutlineArrowUp className="w-6 h-6" />
        </button>
    );
};

export default ScrollToTopButton;
