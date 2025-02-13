import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { Link } from 'react-router-dom';

const LatestVisa = () => {
    const { theme, visas } = useContext(AuthContext);

    return (
        <div className={`w-[90%] mx-auto my-24 md:my-36 ${theme === 'dark' ? 'text-blue-600' : 'text-[#171924]'}`}>
            <h3 className='text-3xl text-center font-bold mb-4'> Latest Visas </h3>
            <p className='text-center mb-8 w-[90%] mx-auto md:w-[70%] lg:w-[40%] opacity-70'> Find the Latest Visa Updates Tailored for You and Explore Opportunities to Travel and Work Abroad </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visas.slice().reverse().slice(0, 6).map((visa) => (
                    <div
                        key={visa._id}
                        className={`h-full border rounded-lg overflow-hidden shadow-lg ${theme === "dark"
                            ? "bg-gray-800/20 border-gray-700"
                            : "bg-white border-gray-200/50"
                            }`}
                    >
                        {/* Image Section */}
                        <div className="h-[220px] md:h-[250px] lg:h-[300px] relative">
                            <img
                                src={visa.countryUrl}
                                alt={visa.countryName}
                                className="w-full h-full object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        </div>

                        
                        <div className="p-6 flex flex-col gap-4">
                            <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                                {visa.countryName}
                            </h2>

                            <div className="flex flex-col gap-2">
                                <p className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    <strong>Visa Type:</strong> {visa.visaType}
                                </p>
                                <p className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    <strong>Fee:</strong> {visa.fee} BDT
                                </p>
                                <p className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    <strong>Processing Time:</strong> {visa.processingTime}
                                </p>
                                <p className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    <strong>Validity:</strong> {visa.validity}
                                </p>
                                <p className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    <strong>Application Method:</strong> {visa.applicationMethod}
                                </p>
                            </div>

                            {/* Button */}
                            <div className="mt-6">
                                <Link to={`/visa-details/${visa._id}`} className="block">
                                    <button className="btn bg-[#f52549] text-white font-bold rounded-lg px-6 py-3 w-full hover:bg-[#e01f43] transition-all duration-300">
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-12 w-full md:w-1/2 lg:w-1/5 mx-auto'>
                <Link to={'/all-visas'}>
                    <button className='btn w-full bg-[#f52549] border-none text-white font-bold hover:glass hover:bg-[#f52549]/90 transition-all delay-75'> See All Visas </button>
                </Link>
            </div>
        </div>
    );
};

export default LatestVisa;