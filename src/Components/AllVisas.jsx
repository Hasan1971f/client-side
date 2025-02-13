import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import { Link, useLocation } from 'react-router-dom';

const AllVisas = () => {
    const { pageBannerImg, theme, visas, filteredVisas, setFilteredVisas } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [visaType, setVisaType] = useState('');

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const visaTypeFromUrl = params.get('visaType');

    useEffect(() => {
        setLoading(true);
        setFilteredVisas(visas);

        const minimumLoadingTime = 2000;
        const dataLoadTimeout = setTimeout(() => {
            if (visas.length > 0) {
                setLoading(false);
            }
        }, minimumLoadingTime);

        const checkDataInterval = setInterval(() => {
            if (visas.length > 0) {
                clearInterval(checkDataInterval);
                setLoading(false);
            }
        }, 500);

        return () => {
            clearTimeout(dataLoadTimeout);
            clearInterval(checkDataInterval);
        };
    }, [visas]);

    useEffect(() => {
        if (visaTypeFromUrl) {
            setVisaType(visaTypeFromUrl);
            setFilteredVisas(visas.filter(visa => visa.visaType === visaTypeFromUrl));
        } else {
            setVisaType('');
            setFilteredVisas(visas);
        }
    }, [visas, visaTypeFromUrl]);

    const handleVisaTypeChange = (event) => {
        const selectedType = event.target.value;
        setLoading(true);
        setVisaType(selectedType);

        setTimeout(() => {
            if (selectedType === '') {
                setFilteredVisas(visas);
            } else {
                setFilteredVisas(visas.filter((visa) => visa.visaType === selectedType));
            }
            setLoading(false);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-[500px]">
                <span className="loading loading-ring loading-lg size-24"></span>
            </div>
        );
    }

    return (
        <div>
            <div className="relative w-full h-[500px] flex flex-col items-center"
                style={{
                    backgroundImage: `url(${pageBannerImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className={`absolute w-full h-full ${theme === 'dark' ? "bg-gradient-to-tr from-[#171924] via-[#171924]/80 to-[#6b1020]/75" : "bg-gradient-to-tr from-white/90 via-white/50 to-[#f52549]/75"}`}></div>
                <div className={`w-[90%] mx-auto ${theme === 'dark' ? 'text-white' : 'text-[#171924]'} z-10 flex justify-center items-center flex-col h-full`}>
                    <h3 className='text-center text-4xl md:text-5xl font-bold mb-5'> All Visas </h3>
                    <p className={`text-center text-xl ${theme === 'dark' ? 'text-white/80' : 'text-[#171924]/80'}`}>
                        Visa Navigator {'>'} All Visas
                    </p>

                </div>
            </div>
            <div className={`w-[90%] mx-auto my-20 ${theme === 'dark' ? 'text-white' : 'text-[#171924]'}`}>
                <h2 className='text-4xl font-bold text-center'> {visaType ? visaType : 'All Visas'} </h2>
                <div className='mt-4 mb-6 flex justify-between gap-3 items-center'>
                    <h3 className='text-xl font-medium'> Total Visas: <strong className='text-[#f52549]'> {filteredVisas.length} </strong> </h3>
                    <div>
                        <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                            <p className={`flex-shrink-0 font-semibold pr-0 sm:pr-2 text-center sm:text-left border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Visa Type: </p>
                            <select name="visaType" value={visaType} onChange={handleVisaTypeChange} required className='w-full bg-transparent text-center sm:text-left'>
                                <option value="" className={`${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                                    All Visa
                                </option>
                                <option value="Tourist Visa" className={`${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                                    Tourist Visa
                                </option>
                                <option value="Student Visa" className={`${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                                    Student Visa
                                </option>
                                <option value="Official Visa" className={`${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                                    Official Visa
                                </option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredVisas.map((visa) => (
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

                            {/* Content Section */}
                            <div className="p-6 flex flex-col gap-3">
                                <h2 className={`text-xl font-semibold text-center ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                                    {visa.countryName}
                                </h2>
                                <p className={`text-sm text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    <strong>Visa Type:</strong> {visa.visaType}
                                </p>
                                <p className={`text-sm text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    <strong>Fee:</strong> {visa.fee} BDT
                                </p>

                                {/* Button */}
                                <div className="flex justify-center mt-4">
                                    <Link to={`/visa-details/${visa._id}`} className="w-full md:w-auto mx-auto">
                                        <button className="btn bg-[#f52549] text-white font-bold rounded-lg px-6 py-2 w-full md:w-auto hover:bg-[#e01f43] transition-all duration-300">
                                            See Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllVisas;
