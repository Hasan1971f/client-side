import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';

const VisaDetails = () => {
    const { visas, theme, pageBannerImg, user, setAppliedVisas, appliedVisas } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const visa = visas.find((data) => data._id === id);

    const {
        countryUrl, countryName, visaType, processingTime, requiredDocuments, description,
        ageRestriction, fee, validity, applicationMethod
    } = visa;

    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 8);

    const currentTime = date + ' - ' + time;
    const handleApplyVisa = (e) => {
        e.preventDefault();
        const form = e.target;

        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const fullName = firstName + ' ' + lastName;
        const userEmail = user.email;

        const appliedVisa = { fullName, userEmail, countryUrl, countryName, visaType, processingTime, fee, validity, applicationMethod, currentTime };
        // console.log(appliedVisa);

        const isAlreadyApplied = appliedVisas.some(
            (visa) => visa.fullName === fullName && visa.userEmail === userEmail && visa.countryName === countryName && visa.visaType === visaType
        );

        if (isAlreadyApplied) {
            Swal.fire({
                icon: 'info',
                title: 'Already Applied',
                text: `You have already applied for a ${visaType} for ${countryName}.`,
                confirmButtonColor: '#f52549',
            });
            document.getElementById('my_modal_5').close();
            return;
        }

        // send to server 
        fetch('https://server-side-phi-green.vercel.app/applied-visa', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appliedVisa)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setAppliedVisas(prevVisas => [...prevVisas, { ...appliedVisa, _id: data.insertedId }]);
                    Swal.fire({
                        icon: 'success',
                        title: 'Application Submitted',
                        text: `You have successfully applied for a ${visaType} for ${countryName}.`,
                        confirmButtonColor: '#171924',
                    });
                    document.getElementById('my_modal_5').close();
                    form.reset();
                }
            })
    }

    const handleCloseDetails = () => {
        navigate('/all-visas');
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
                    <h3 className='text-center text-4xl md:text-5xl font-bold mb-5'> Visa Details </h3>
                    <p className={`text-center text-xl ${theme === 'dark' ? 'text-white/80' : 'text-[#171924]/80'}`}>
                        Visa Navigator {'>'} Visa Details {'>'} {countryName}
                    </p>

                </div>
            </div>
            <div className={`w-[90%] mx-auto my-20 ${theme === 'dark' ? 'text-white' : 'text-[#171924]'}`}>
                {/* Card Container */}
                <div className={`max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto shadow-lg border rounded-lg overflow-hidden transition-all duration-300 ${theme === "dark" ? 'bg-gray-800/20 border-gray-700' : 'bg-white border-gray-200/50'}`}>
                    {/* Image Section */}
                    <div className='relative'>
                        <img
                            src={countryUrl}
                            alt="Country"
                            className='w-full h-56 object-cover'
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className='p-6'>
                        <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Country: <span className='text-[#f52549]'>{countryName}</span></h3>

                        {/* Visa Details */}
                        <div className='space-y-2'>
                            <p className={`${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}>
                                <strong className="font-semibold">Visa Type:</strong> {visaType}
                            </p>
                            <p className={`${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}>
                                <strong className="font-semibold">Processing Time:</strong> {processingTime ? processingTime : 'Not Confirmed Yet'}
                            </p>
                            <p className={`${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}>
                                <strong className="font-semibold">Validity:</strong> {validity}
                            </p>
                            <p className={`${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}>
                                <strong className="font-semibold">Application Method:</strong> {applicationMethod ? applicationMethod : 'Offline'}
                            </p>
                            <p className={`${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}>
                                <strong className="font-semibold">Visa Fee:</strong> {fee}
                            </p>
                        </div>

                        {/* Required Documents */}
                        <div className='mt-4'>
                            <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Required Documents:</h4>
                            <ul className={`list-disc list-inside space-y-1 ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                                {requiredDocuments.map((doc, index) => (
                                    <li key={index}>{doc}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className='mt-6 flex flex-col md:flex-row gap-2'>
                            <button className={`w-full md:w-2/3 py-2 px-4 rounded-lg font-semibold ${theme === 'dark' ? 'bg-white text-[#171924] hover:bg-gray-200' : 'bg-[#171924] text-white hover:bg-gray-800'}`} onClick={() => document.getElementById('my_modal_5').showModal()}>
                                Apply For The Visa
                            </button>
                            <button className='w-full md:w-1/3 py-2 px-4 rounded-lg bg-[#f52549] text-white hover:bg-[#f52549]/80 font-semibold' onClick={handleCloseDetails}>
                                Close
                            </button>
                        </div>

                        {/* Modal */}
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box p-4 sm:p-6">
                                <h3 className='font-semibold text-xl sm:text-2xl text-center mb-5'>Please Fill The Form To Apply</h3>
                                <form onSubmit={handleApplyVisa}>
                                    <input type="email" className="input input-bordered w-full" value={user.email} readOnly />
                                    <div className='flex flex-col sm:flex-row justify-center gap-3 my-3'>
                                        <input type="text" className='input input-bordered' name='firstName' placeholder="First Name" />
                                        <input type="text" className='input input-bordered' name='lastName' placeholder="Last Name" />
                                    </div>
                                    <label htmlFor="date">
                                        <p className='mb-2 opacity-60 pl-0.5'>Applied Date And Time</p>
                                        <input type="text" id='date' name='date' className="input input-bordered w-full opacity-60" value={currentTime} readOnly />
                                    </label>
                                    <div className='pl-0.5 mt-6 opacity-90'>
                                        <p>Visa Fee: <strong>{fee} BDT</strong></p>
                                    </div>
                                    <div className='flex items-center gap-2 mt-6'>
                                        <button className={`btn w-2/3 font-bold ${theme === 'dark' ? 'bg-white text-[#171924] hover:bg-gray-200' : 'bg-[#171924] text-white hover:bg-gray-800'}`}>Apply</button>
                                        <div className='w-full'>
                                            <form method="dialog">
                                                <button className="btn bg-[#f52549] text-white hover:bg-[#f52549]/80 w-full text-2xl">
                                                    <IoClose />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VisaDetails;