import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';
import { FaSearch } from 'react-icons/fa';

const MyVisaApplication = () => {
    const { pageBannerImg, theme, appliedVisas, user } = useContext(AuthContext);

    const [myAppliedVisas, setMyAppliedVisas] = useState(appliedVisas.filter(visa => visa.userEmail === user.email));

    const handleCancelApplication = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't to cancel this application!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#171924",
            cancelButtonColor: "#f52549",
            confirmButtonText: "Yes, I'm Sure"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://server-side-phi-green.vercel.app/applied-visa/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                                confirmButtonColor: '#f52549',
                            });
                            const remainingVisas = myAppliedVisas.filter(visa => visa._id !== _id);
                            setMyAppliedVisas(remainingVisas);
                        }
                    })

            }
        });
    }
    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredVisas = appliedVisas.filter(visa =>
            visa.userEmail === user.email &&
            visa.countryName.toLowerCase().includes(searchQuery)
        );
        setMyAppliedVisas(filteredVisas);
    };

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
                    <h3 className='text-center text-4xl md:text-5xl font-bold mb-5'> My Visa Applications </h3>
                    <p className={`text-center text-xl ${theme === 'dark' ? 'text-white/80' : 'text-[#171924]/80'}`}>
                        Visa Navigator {'>'} My Visa Applications
                    </p>

                </div>
            </div>
            <div className={`w-[90%] mx-auto my-20 ${theme === 'dark' ? 'text-white' : 'text-[#171924]'}`}>
                <div className='flex flex-col lg:flex-row justify-between gap-5 items-center'>
                    <h3 className='text-center text-xl font-bold'> My Visa Applications: <span className='text-[#f52549]'> {myAppliedVisas.length} </span> </h3>
                    <div className='flex flex-col sm:flex-row gap-2 sm:gap-0'>
                        <label className="relative flex items-center">
                            <input
                                type="text"
                                className="grow focus:outline-none bg-transparent p-3 border-gray-500/25 sm:rounded-none sm:rounded-s-lg border"
                                name="search"
                                placeholder="Search"
                                onChange={handleSearch}
                            />
                            <FaSearch className="opacity-40 absolute right-4" />
                        </label>
                        <button className='btn flex-grow h-auto py-3 bg-[#f52549] border-none text-white font-bold hover:glass hover:bg-[#f52549]/90 transition-all delay-75 sm:rounded-none sm:rounded-e-lg'> Search </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {
                        myAppliedVisas.map((visa) => (
                            <div
                                key={visa._id}
                                className={`h-full flex flex-col border rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ${theme === "dark"
                                    ? "bg-gray-800/20 border-gray-700"
                                    : "bg-white border-gray-200/50"
                                    }`}
                            >
                               
                                <div className="h-[220px] md:h-[250px] lg:h-[280px] relative">
                                    <img
                                        src={visa.countryUrl}
                                        alt={visa.countryName}
                                        className="w-full h-full object-cover rounded-t-lg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                </div>

                                
                                <div className="p-6 flex flex-col gap-5 flex-grow">
                                    <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-[#171924]"}`}>{visa.countryName}</h2>
                                    {/* Information Grid */}
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                            <strong>Visa Type:</strong> {visa.visaType}
                                        </p>
                                        <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                            <strong>Processing Time:</strong> {visa.processingTime}
                                        </p>
                                        <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                            <strong>Fee:</strong> {visa.fee} BDT
                                        </p>
                                        <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                            <strong>Validity:</strong> {visa.validity}
                                        </p>

                                        {/* Additional Details */}
                                        <div className="space-y-2">
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                                <strong>Application Method:</strong> {visa.applicationMethod}
                                            </p>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                                <strong>Applied Date:</strong> {visa.currentTime}
                                            </p>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                                <strong>Applicant's Name:</strong> {visa.fullName}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Button */}
                                </div>
                                <div className='p-6'>
                                    <button
                                        onClick={() => handleCancelApplication(visa._id)}
                                        className={`btn font-bold w-full text-white transition-colors duration-300 ${theme === "dark"
                                            ? "bg-[#f52549] hover:bg-[#f52549]/80"
                                            : "bg-[#f52549] hover:bg-[#f52549]/80"
                                            }`}
                                    >
                                        Cancel Application
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MyVisaApplication;