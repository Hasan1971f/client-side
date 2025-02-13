import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import Footer from './Footer';

const Root = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { setMenu, theme, setDropdownVisible } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOutletClick = () => {
        setMenu(false);
        setDropdownVisible(false); 
    };

    return (
        <div className='relative'>
            <div className={`top-0 z-50 backdrop-blur-md border border-white/15 ${theme === 'dark' ? 'text-white' : 'text-[#171924]'}  transition-all duration-300 ${isScrolled ? `${theme === 'dark' ? "bg-[#171924]/90" : "bg-white/70"} sticky` : `${theme === 'dark' ? "bg-[#171924]/30" : "bg-white/50"} absolute w-full`}`}>
                <Navbar />
            </div>
            <div onClick={handleOutletClick} className={theme === 'dark' ? '': 'bg-gray-50'}>
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;
