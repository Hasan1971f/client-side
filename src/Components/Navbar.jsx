import React, { useContext, useState } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [theme, setTheme] = useState('light');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { user, handleLogOut } = useContext(AuthContext);

    const lightTheme = () => setTheme('light');
    const darkTheme = () => setTheme('dark');

    const links = (
        <>
            <li><NavLink to={'/'} className={({ isActive }) => isActive ? 'text-green-500 font-bold' : 'hover:text-red-500 transition-colors duration-300'}>Home</NavLink></li>
            <li><NavLink to={'/all-visas'} className={({ isActive }) => isActive ? 'text-green-500 font-bold' : 'hover:text-red-500 transition-colors duration-300'}>All Visas</NavLink></li>
            <li><NavLink to={'/add-visa'} className={({ isActive }) => isActive ? 'text-green-500 font-bold' : 'hover:text-red-500 transition-colors duration-300'}>Add Visa</NavLink></li>
            <li><NavLink to={'/my-added-visas'} className={({ isActive }) => isActive ? 'text-green-500 font-bold' : 'hover:text-red-500 transition-colors duration-300'}>My Added Visas</NavLink></li>
            <li><NavLink to={'/my-visa-application'} className={({ isActive }) => isActive ? 'text-green-500 font-bold' : 'hover:text-red-500 transition-colors duration-300'}>My Visa Applications</NavLink></li>
        </>
    );

    return (
        <nav className={`w-[95%] md:w-[90%] mx-auto py-3 md:py-5 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#171924] text-white' : 'bg-white text-[#171924] shadow-md'}`}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Mobile Menu Button */}
                <div className="xl:hidden">
                    <button className="btn btn-ghost p-0" onClick={() => setMenu(!menu)}>
                        {menu ? <IoMdClose className="text-3xl" /> : <HiMenuAlt1 className="text-3xl" />}
                    </button>
                </div>

                {/* Logo and Branding */}
                <Link to={'/'} className="flex items-center gap-2 text-xl md:text-2xl font-medium">
                    <img src="/images/logo.png" alt="Visa Navigator Logo" className="w-10 md:w-12" />
                    <span className="hidden sm:inline">Visa Navigator</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden xl:flex">
                    <ul className="flex gap-8 text-lg font-semibold">{links}</ul>
                </div>

                {/* Theme Toggle & Profile */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <div className="flex border rounded-lg overflow-hidden">
                        <button onClick={lightTheme} className={`btn ${theme === 'light' ? 'bg-red-500 text-white' : 'btn-ghost'} rounded-none rounded-l-lg p-2 transition-colors duration-300`}>
                            <FaSun className="text-xl" />
                        </button>
                        <button onClick={darkTheme} className={`btn ${theme === 'dark' ? 'bg-red-500 text-white' : 'btn-ghost'} rounded-none rounded-r-lg p-2 transition-colors duration-300`}>
                            <FaMoon className="text-xl" />
                        </button>
                    </div>

                   
                    {user ? (
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer" onClick={() => setDropdownVisible(!dropdownVisible)}>
                                <img src={user.photoURL} alt="User Profile" className="w-full h-full object-cover" />
                            </div>
                            {dropdownVisible && (
                                <div className="absolute right-0 top-14 w-48 bg-white dark:bg-[#171924] shadow-lg rounded-lg p-2 z-10">
                                    <p className="font-semibold mb-2">{user.displayName}</p>
                                    <button onClick={handleLogOut} className="btn w-full bg-red-500 text-white rounded-lg hover:bg-red-500/90 transition-all duration-300">
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="btn bg-red-500 text-white rounded-lg hover:bg-red-500/90 transition-all duration-300">Login</Link>
                            <Link to="/register" className="btn bg-red-500 text-white rounded-lg hover:bg-red-500/90 transition-all duration-300">Register</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {menu && (
                <div className={`fixed z-50 top-0 left-0 w-full h-screen ${theme === 'dark' ? 'bg-[#171924] text-white' : 'bg-white text-[#171924]'} xl:hidden overflow-y-auto p-8 shadow-xl`}>
                    <div className="mb-4 flex justify-between items-center">
                        <button className="bg-red-500 text-white rounded-full p-2 hover:opacity-80 transition-all duration-300" onClick={() => setMenu(false)}>
                            <IoMdClose className="text-2xl" />
                        </button>
                    </div>
                    <ul className="flex flex-col gap-4 text-xl font-semibold">{links}</ul>
                    {!user && (
                        <div className="flex flex-col gap-4 mt-8">
                            <Link to="/login" className="btn bg-red-500 text-white rounded-lg hover:bg-red-500/90 transition-all duration-300">Login</Link>
                            <Link to="/register" className="btn bg-red-500 text-white rounded-lg hover:bg-red-500/90 transition-all duration-300">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
