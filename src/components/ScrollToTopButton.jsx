import React, { useState, useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { IoIosArrowUp } from "react-icons/io";

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
            className={`fixed bottom-6 w-[31px] h-[31px] right-6 p-4 bg-[#046BD2] text-white shadow-lg transition-transform duration-300 ease-in-out ${isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0 flex items-center justify-center relative'}`}
            aria-label="Scroll to Top"
        >
            <IoIosArrowUp  size={20} className='absolute top-[6px] left-[6px]'/>
        </button>
    );
};

export default ScrollToTopButton;
