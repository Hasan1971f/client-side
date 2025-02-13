import React, { useContext } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const Footer = () => {
    const {theme} = useContext(AuthContext)
    return (
        <footer className={`${theme === 'dark' ? 'text-white bg-[#101217]' : 'bg-[#3852e7] text-white'} py-14 md:py-16`}>
            <div className="mb-12 w-[90%] md:w-[78%] mx-auto flex justify-center md:justify-start active:scale-80 md:flex items-center gap-3">
                <img src="/images/logo-white.png" alt="" className="w-20" />
                <h3 className='hidden md:flex text-4xl font-bold'> Visa Navigator </h3>
            </div>
            <div className="w-[90%] md:w-[78%] mx-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-12 justify-between">
                <div className="active:scale-80">
                    <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                    <p className="">
                        Email: <a href="https://mail.google.com/mail/" className="text-blue-400 hover:underline"> visanavigator@gmail.com </a>
                    </p>
                    <p className="">Phone: +123 456 7890</p>
                    <p className="">Address: 123 Language Street, Learn City, USA</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
                    <ul className="flex gap-6 items-center">
                        <li>
                            <Link to={'https://facebook.com'} className="text-2xl hover:text-[#0b74f5]"> <FaFacebook /> </Link>
                        </li>
                        <li>
                            <Link to={'https://instagram.com'} className="text-[28px] hover:text-pink-500"> <FaInstagram /> </Link>
                        </li>
                        <li>
                            <Link to={'https://x.com'} className="text-2xl hover:text-gray-500"> <FaXTwitter /> </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-3">Copyright</h3>
                    <p className="">© 2025 Visa Navigator. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;