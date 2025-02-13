import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#171924] via-[#17111c] to-[#ff002b] text-white relative overflow-hidden">
            
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
                <div className="h-[450px] w-[450px] bg-gradient-to-br from-[#f52549] to-[#f27d90] blur-3xl rounded-full animate-pulse"></div>
            </div>
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
                <div className="h-[300px] w-[300px] bg-gradient-to-tr from-[#171924] to-[#2a2d3e] blur-2xl rounded-full animate-pulse"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center p-6 max-w-md mx-auto">
                <h1 className="text-9xl font-extrabold drop-shadow-lg animate-pulse tracking-wider mb-4">
                    404
                </h1>
                <p className="text-3xl font-semibold mb-3">Whoops! An Error Occurred </p>
                <p className="text-lg text-gray-300 mb-6">
                    The page you're looking for doesn't exist. Let's get you back home.
                </p>
                <Link to="/">
                    <button className="px-10 py-4 bg-[#f52549] text-white font-bold rounded-full text-lg shadow-lg transform hover:scale-105 hover:bg-[#ff6b6b] transition duration-300 ease-in-out">
                        Back To Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
